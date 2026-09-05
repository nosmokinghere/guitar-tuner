let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let currentStop: (() => void) | null = null;

function getGraph() {
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    ctx = new AC({ latencyHint: "interactive" });
    master = ctx.createGain();
    master.gain.value = 0.7;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") {
    void ctx.resume();
  }
  return { ctx, master: master! };
}

export function unlockAudio() {
  const { ctx } = getGraph();
  if (ctx.state === "suspended") {
    void ctx.resume();
  }
}

export function setMasterVolume(linear: number) {
  const { ctx, master } = getGraph();
  const v = Math.max(0, Math.min(1, linear));
  master.gain.setTargetAtTime(v * v, ctx.currentTime, 0.03);
}

export function playString(freq: number, duration = 2.6) {
  const { ctx, master } = getGraph();
  currentStop?.();

  const now = ctx.currentTime;
  const voice = ctx.createGain();
  voice.gain.setValueAtTime(0.0001, now);
  voice.gain.exponentialRampToValueAtTime(0.55, now + 0.006);
  voice.gain.exponentialRampToValueAtTime(0.18, now + 0.14);
  voice.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  voice.connect(master);

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(Math.min(4200, freq * 10), now);
  filter.frequency.exponentialRampToValueAtTime(
    Math.min(1400, freq * 3.2),
    now + duration * 0.7,
  );
  filter.Q.value = 0.7;
  filter.connect(voice);

  const harmonics = [
    { mul: 1, amp: 1, type: "sine" as OscillatorType },
    { mul: 2, amp: 0.38, type: "sine" as OscillatorType },
    { mul: 3, amp: 0.18, type: "sine" as OscillatorType },
    { mul: 4, amp: 0.1, type: "sine" as OscillatorType },
    { mul: 5, amp: 0.05, type: "sine" as OscillatorType },
    { mul: 6, amp: 0.03, type: "triangle" as OscillatorType },
  ];

  const nodes: AudioNode[] = [voice, filter];
  const oscs: OscillatorNode[] = [];

  for (const h of harmonics) {
    const osc = ctx.createOscillator();
    osc.type = h.type;
    osc.frequency.value = freq * h.mul;
    const g = ctx.createGain();
    g.gain.value = h.amp / Math.sqrt(h.mul);
    osc.connect(g);
    g.connect(filter);
    osc.start(now);
    osc.stop(now + duration + 0.05);
    oscs.push(osc);
    nodes.push(g);
  }

  // Pluck transient — short filtered noise
  const nLen = Math.floor(ctx.sampleRate * 0.04);
  const buf = ctx.createBuffer(1, nLen, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < nLen; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / nLen);
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buf;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.22, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = "bandpass";
  noiseFilter.frequency.value = freq * 2;
  noiseFilter.Q.value = 1.4;
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(voice);
  noise.start(now);

  currentStop = () => {
    const t = ctx.currentTime;
    voice.gain.cancelScheduledValues(t);
    voice.gain.setTargetAtTime(0.0001, t, 0.03);
    window.setTimeout(() => {
      for (const osc of oscs) {
        try {
          osc.stop();
        } catch {
          /* already stopped */
        }
      }
      for (const n of nodes) n.disconnect();
      noise.disconnect();
      noiseGain.disconnect();
      noiseFilter.disconnect();
    }, 80);
    currentStop = null;
  };

  window.setTimeout(() => {
    if (currentStop) currentStop();
  }, (duration + 0.1) * 1000);
}
