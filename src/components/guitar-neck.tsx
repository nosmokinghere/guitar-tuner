import { STANDARD_STRINGS, type GuitarString } from "@/lib/strings";
import { cn } from "@/lib/utils";

const FRETS = 12;

type Props = {
  activeId: number | null;
  onPick: (s: GuitarString) => void;
};

export function GuitarNeck({ activeId, onPick }: Props) {
  return (
    <div className="flex w-full flex-col gap-3">
      <div
        className="relative overflow-hidden rounded-xl bg-raised shadow-[var(--shadow-border)]"
        aria-hidden="false"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-accent/18 to-transparent sm:w-14" />
        <div className="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3.25rem_1fr]">
          <div className="flex flex-col justify-between py-3 pl-2 pr-1 sm:py-4">
            {STANDARD_STRINGS.map((s) => (
              <span
                key={s.id}
                className={cn(
                  "font-mono text-[10px] tracking-wide sm:text-xs",
                  activeId === s.id ? "text-fg" : "text-muted",
                )}
              >
                {s.id}
              </span>
            ))}
          </div>
          <div className="relative py-3 pr-3 sm:py-4 sm:pr-4">
            <Fretboard />
            <div className="relative flex h-44 flex-col justify-between sm:h-56">
              {STANDARD_STRINGS.map((s, i) => {
                const thick = 1.2 + (5 - i) * 0.45;
                const lit = activeId === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => onPick(s)}
                    aria-label={`Play ${s.label} ${s.name}${s.octave}`}
                    className="group relative flex h-7 items-center sm:h-8"
                  >
                    <span
                      className={cn(
                        "block h-px w-full origin-center rounded-full bg-accent/55 transition-[background-color,box-shadow] duration-200",
                        lit && "bg-fg shadow-[0_0_12px_rgba(240,239,233,0.35)]",
                      )}
                      style={{
                        height: thick,
                        animation: lit
                          ? "string-hum 0.08s linear infinite"
                          : undefined,
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-muted">
        Strings run low to high, same as looking down the neck.
      </p>
    </div>
  );
}

function Fretboard() {
  return (
    <div className="pointer-events-none absolute inset-y-0 left-0 right-3 sm:right-4">
      {Array.from({ length: FRETS + 1 }, (_, i) => (
        <div
          key={i}
          className={cn(
            "absolute top-0 bottom-0 w-px",
            i === 0 ? "bg-accent/40" : "bg-border-strong",
          )}
          style={{ left: `${(i / FRETS) * 100}%` }}
        />
      ))}
      {[3, 5, 7, 9].map((fret) => (
        <div
          key={fret}
          className="absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted/50 sm:size-2"
          style={{ left: `${((fret - 0.5) / FRETS) * 100}%` }}
        />
      ))}
      <div
        className="absolute top-[32%] size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted/50 sm:size-2"
        style={{ left: `${((12 - 0.5) / FRETS) * 100}%` }}
      />
      <div
        className="absolute top-[68%] size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted/50 sm:size-2"
        style={{ left: `${((12 - 0.5) / FRETS) * 100}%` }}
      />
    </div>
  );
}
