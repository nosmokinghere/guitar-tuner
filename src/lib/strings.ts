export type GuitarString = {
  id: number;
  name: string;
  octave: string;
  freq: number;
  label: string;
};

/** Standard tuning, low (6) to high (1). */
export const STANDARD_STRINGS: GuitarString[] = [
  { id: 6, name: "E", octave: "2", freq: 82.41, label: "Low E" },
  { id: 5, name: "A", octave: "2", freq: 110.0, label: "A" },
  { id: 4, name: "D", octave: "3", freq: 146.83, label: "D" },
  { id: 3, name: "G", octave: "3", freq: 196.0, label: "G" },
  { id: 2, name: "B", octave: "3", freq: 246.94, label: "B" },
  { id: 1, name: "E", octave: "4", freq: 329.63, label: "High E" },
];
