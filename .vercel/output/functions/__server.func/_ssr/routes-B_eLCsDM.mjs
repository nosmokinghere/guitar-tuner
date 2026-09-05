import { i as __toESM } from "../_runtime.mjs";
import { L as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as ChevronDown, t as Volume2 } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B_eLCsDM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Standard tuning, low (6) to high (1). */
var STANDARD_STRINGS = [
	{
		id: 6,
		name: "E",
		octave: "2",
		freq: 82.41,
		label: "Low E"
	},
	{
		id: 5,
		name: "A",
		octave: "2",
		freq: 110,
		label: "A"
	},
	{
		id: 4,
		name: "D",
		octave: "3",
		freq: 146.83,
		label: "D"
	},
	{
		id: 3,
		name: "G",
		octave: "3",
		freq: 196,
		label: "G"
	},
	{
		id: 2,
		name: "B",
		octave: "3",
		freq: 246.94,
		label: "B"
	},
	{
		id: 1,
		name: "E",
		octave: "4",
		freq: 329.63,
		label: "High E"
	}
];
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var FRETS = 12;
function GuitarNeck({ activeId, onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex w-full flex-col gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-xl bg-raised shadow-[var(--shadow-border)]",
			"aria-hidden": "false",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-accent/18 to-transparent sm:w-14" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3.25rem_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col justify-between py-3 pl-2 pr-1 sm:py-4",
					children: STANDARD_STRINGS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("font-mono text-[10px] tracking-wide sm:text-xs", activeId === s.id ? "text-fg" : "text-muted"),
						children: s.id
					}, s.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative py-3 pr-3 sm:py-4 sm:pr-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fretboard, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative flex h-44 flex-col justify-between sm:h-56",
						children: STANDARD_STRINGS.map((s, i) => {
							const thick = 1.2 + (5 - i) * .45;
							const lit = activeId === s.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => onPick(s),
								"aria-label": `Play ${s.label} ${s.name}${s.octave}`,
								className: "group relative flex h-7 items-center sm:h-8",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("block h-px w-full origin-center rounded-full bg-accent/55 transition-[background-color,box-shadow] duration-200", lit && "bg-fg shadow-[0_0_12px_rgba(240,239,233,0.35)]"),
									style: {
										height: thick,
										animation: lit ? "string-hum 0.08s linear infinite" : void 0
									}
								})
							}, s.id);
						})
					})]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-center text-xs text-muted",
			children: "Strings run low to high, same as looking down the neck."
		})]
	});
}
function Fretboard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-y-0 left-0 right-3 sm:right-4",
		children: [
			Array.from({ length: 13 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("absolute top-0 bottom-0 w-px", i === 0 ? "bg-accent/40" : "bg-border-strong"),
				style: { left: `${i / FRETS * 100}%` }
			}, i)),
			[
				3,
				5,
				7,
				9
			].map((fret) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted/50 sm:size-2",
				style: { left: `${(fret - .5) / FRETS * 100}%` }
			}, fret)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-[32%] size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted/50 sm:size-2",
				style: { left: `${11.5 / FRETS * 100}%` }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-[68%] size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted/50 sm:size-2",
				style: { left: `${11.5 / FRETS * 100}%` }
			})
		]
	});
}
function TunerPanel({ open, activeId, onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid transition-[grid-template-rows,opacity] duration-400 ease-[var(--ease-out-smooth)] motion-reduce:transition-none", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden",
			inert: !open || void 0,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-surface p-3 shadow-[var(--shadow-border)] sm:p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-end justify-between gap-3 px-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-medium uppercase tracking-[0.16em] text-muted",
						children: "Standard tuning"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl italic text-fg sm:text-2xl",
						children: "E A D G B E"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hidden font-mono text-[11px] text-subtle sm:block",
						children: "A4 = 440 Hz"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-2 sm:grid-cols-6",
					children: STANDARD_STRINGS.map((s) => {
						const on = activeId === s.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => onPick(s),
							className: cn("flex min-h-11 flex-col items-center justify-center rounded-lg px-2 py-2.5 text-center transition-[background-color,color,box-shadow,transform] duration-150 ease-[var(--ease-out-smooth)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", "active:scale-[0.98]", on ? "bg-fg text-accent-fg shadow-[var(--shadow-border-hover)]" : "bg-raised text-fg shadow-[var(--shadow-border)] hover:bg-raised/80"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-display text-2xl leading-none",
								children: [s.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "align-super font-sans text-[10px] font-medium text-current/60",
									children: s.octave
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: cn("mt-1 font-mono text-[10px] tracking-wide", on ? "text-accent-fg/60" : "text-muted"),
								children: [
									s.id,
									" · ",
									s.freq.toFixed(s.freq % 1 === 0 ? 0 : 1)
								]
							})]
						}, s.id);
					})
				})]
			})
		})
	});
}
var ctx = null;
var master = null;
var currentStop = null;
function getGraph() {
	if (!ctx) {
		ctx = new (window.AudioContext || window.webkitAudioContext)({ latencyHint: "interactive" });
		master = ctx.createGain();
		master.gain.value = .7;
		master.connect(ctx.destination);
	}
	if (ctx.state === "suspended") ctx.resume();
	return {
		ctx,
		master
	};
}
function unlockAudio() {
	const { ctx } = getGraph();
	if (ctx.state === "suspended") ctx.resume();
}
function setMasterVolume(linear) {
	const { ctx, master } = getGraph();
	const v = Math.max(0, Math.min(1, linear));
	master.gain.setTargetAtTime(v * v, ctx.currentTime, .03);
}
function playString(freq, duration = 2.6) {
	const { ctx, master } = getGraph();
	currentStop?.();
	const now = ctx.currentTime;
	const voice = ctx.createGain();
	voice.gain.setValueAtTime(1e-4, now);
	voice.gain.exponentialRampToValueAtTime(.55, now + .006);
	voice.gain.exponentialRampToValueAtTime(.18, now + .14);
	voice.gain.exponentialRampToValueAtTime(1e-4, now + duration);
	voice.connect(master);
	const filter = ctx.createBiquadFilter();
	filter.type = "lowpass";
	filter.frequency.setValueAtTime(Math.min(4200, freq * 10), now);
	filter.frequency.exponentialRampToValueAtTime(Math.min(1400, freq * 3.2), now + duration * .7);
	filter.Q.value = .7;
	filter.connect(voice);
	const harmonics = [
		{
			mul: 1,
			amp: 1,
			type: "sine"
		},
		{
			mul: 2,
			amp: .38,
			type: "sine"
		},
		{
			mul: 3,
			amp: .18,
			type: "sine"
		},
		{
			mul: 4,
			amp: .1,
			type: "sine"
		},
		{
			mul: 5,
			amp: .05,
			type: "sine"
		},
		{
			mul: 6,
			amp: .03,
			type: "triangle"
		}
	];
	const nodes = [voice, filter];
	const oscs = [];
	for (const h of harmonics) {
		const osc = ctx.createOscillator();
		osc.type = h.type;
		osc.frequency.value = freq * h.mul;
		const g = ctx.createGain();
		g.gain.value = h.amp / Math.sqrt(h.mul);
		osc.connect(g);
		g.connect(filter);
		osc.start(now);
		osc.stop(now + duration + .05);
		oscs.push(osc);
		nodes.push(g);
	}
	const nLen = Math.floor(ctx.sampleRate * .04);
	const buf = ctx.createBuffer(1, nLen, ctx.sampleRate);
	const data = buf.getChannelData(0);
	for (let i = 0; i < nLen; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / nLen);
	const noise = ctx.createBufferSource();
	noise.buffer = buf;
	const noiseGain = ctx.createGain();
	noiseGain.gain.setValueAtTime(.22, now);
	noiseGain.gain.exponentialRampToValueAtTime(1e-4, now + .05);
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
		voice.gain.setTargetAtTime(1e-4, t, .03);
		window.setTimeout(() => {
			for (const osc of oscs) try {
				osc.stop();
			} catch {}
			for (const n of nodes) n.disconnect();
			noise.disconnect();
			noiseGain.disconnect();
			noiseFilter.disconnect();
		}, 80);
		currentStop = null;
	};
	window.setTimeout(() => {
		if (currentStop) currentStop();
	}, (duration + .1) * 1e3);
}
function Home() {
	const [open, setOpen] = (0, import_react.useState)(true);
	const [active, setActive] = (0, import_react.useState)(null);
	const [volume, setVolume] = (0, import_react.useState)(.72);
	(0, import_react.useEffect)(() => {
		const resume = () => unlockAudio();
		window.addEventListener("pointerdown", resume, { once: true });
		window.addEventListener("keydown", resume, { once: true });
		const onVis = () => {
			if (document.visibilityState === "visible") unlockAudio();
		};
		document.addEventListener("visibilitychange", onVis);
		return () => {
			window.removeEventListener("pointerdown", resume);
			window.removeEventListener("keydown", resume);
			document.removeEventListener("visibilitychange", onVis);
		};
	}, []);
	function pick(s) {
		unlockAudio();
		playString(s.freq);
		setActive(s);
	}
	function onVolume(v) {
		setVolume(v);
		unlockAudio();
		setMasterVolume(v);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-svh w-full max-w-3xl flex-col px-4 pb-10 pt-6 sm:px-6 sm:pt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-4 flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium uppercase tracking-[0.2em] text-muted",
					children: "Reference pitch"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl leading-tight tracking-tight text-fg sm:text-5xl",
					children: "Pegbox"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 pt-2 text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {
							className: "size-4",
							strokeWidth: 1.75,
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Volume"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 0,
							max: 1,
							step: .01,
							value: volume,
							onChange: (e) => onVolume(Number(e.target.value)),
							className: "h-1 w-20 accent-accent sm:w-28",
							"aria-label": "Volume"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5 rounded-[26px] bg-raised p-2 shadow-[var(--shadow-border)] sm:p-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					"aria-expanded": open,
					onClick: () => setOpen((v) => !v),
					className: "flex min-h-11 w-full items-center justify-between rounded-xl px-3 text-left text-fg transition-colors duration-150 hover:bg-surface",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-baseline gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: "Tuner"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[11px] text-muted",
							children: active ? `${active.label} · ${active.freq.toFixed(2)} Hz` : "six strings"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
						className: cn("size-4 text-muted transition-transform duration-250 ease-[var(--ease-out-smooth)]", open && "rotate-180"),
						strokeWidth: 1.75
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-1 pb-1 pt-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TunerPanel, {
						open,
						activeId: active?.id ?? null,
						onPick: pick
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuitarNeck, {
				activeId: active?.id ?? null,
				onPick: pick
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-auto pt-8 text-center text-xs text-subtle",
				children: "Tap a string to hear the concert pitch. Match your guitar to it."
			})
		]
	});
}
//#endregion
export { Home as component };
