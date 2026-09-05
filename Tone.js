var strings = [
  { id: 6, name: "E", octave: "2", freq: 82.41, label: "Low E" },
  { id: 5, name: "A", octave: "2", freq: 110.00, label: "A" },
  { id: 4, name: "D", octave: "3", freq: 146.83, label: "D" },
  { id: 3, name: "G", octave: "3", freq: 196.00, label: "G" },
  { id: 2, name: "B", octave: "3", freq: 246.94, label: "B" },
  { id: 1, name: "E", octave: "4", freq: 329.63, label: "High E" }
]

function playCommand(freq) {
  var f = Number(freq).toFixed(2)
  return [
    "sh", "-c",
    "if command -v play >/dev/null 2>&1; then play -nq synth 2 sine " + f + " fade 0 2 0.18; " +
    "elif command -v ffplay >/dev/null 2>&1; then ffplay -nodisp -autoexit -loglevel quiet -f lavfi -i sine=frequency=" + f + ":duration=2; " +
    "else python3 -c \"import math,struct,subprocess,tempfile,os;" +
    "sr=22050;n=int(sr*2);f=float('" + f + "');" +
    "data=b''.join(struct.pack('<h', int(32000*math.sin(2*math.pi*f*i/sr)*max(0,1-i/n))) for i in range(n));" +
    "p=tempfile.mkstemp(suffix='.wav')[1];" +
    "open(p,'wb').write(b'RIFF'+struct.pack('<I',36+len(data))+b'WAVEfmt '+struct.pack('<IHHIIHH',16,1,1,sr,sr*2,2,16)+b'data'+struct.pack('<I',len(data))+data);" +
    "os.system('paplay '+p+' 2>/dev/null || pw-play '+p+' 2>/dev/null || aplay '+p+' 2>/dev/null'); os.remove(p)\"" +
    "; fi"
  ]
}
