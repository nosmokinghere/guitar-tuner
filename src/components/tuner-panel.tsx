import { STANDARD_STRINGS, type GuitarString } from "@/lib/strings";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  activeId: number | null;
  onPick: (s: GuitarString) => void;
};

export function TunerPanel({ open, activeId, onPick }: Props) {
  return (
    <div
      className={cn(
        "grid transition-[grid-template-rows,opacity] duration-400 ease-[var(--ease-out-smooth)] motion-reduce:transition-none",
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      )}
    >
      <div className="overflow-hidden" inert={!open || undefined}>
        <div className="rounded-xl bg-surface p-3 shadow-[var(--shadow-border)] sm:p-4">
          <div className="mb-3 flex items-end justify-between gap-3 px-1">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                Standard tuning
              </p>
              <p className="font-display text-xl italic text-fg sm:text-2xl">
                E A D G B E
              </p>
            </div>
            <p className="hidden font-mono text-[11px] text-subtle sm:block">
              A4 = 440 Hz
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {STANDARD_STRINGS.map((s) => {
              const on = activeId === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onPick(s)}
                  className={cn(
                    "flex min-h-11 flex-col items-center justify-center rounded-lg px-2 py-2.5 text-center transition-[background-color,color,box-shadow,transform] duration-150 ease-[var(--ease-out-smooth)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    "active:scale-[0.98]",
                    on
                      ? "bg-fg text-accent-fg shadow-[var(--shadow-border-hover)]"
                      : "bg-raised text-fg shadow-[var(--shadow-border)] hover:bg-raised/80",
                  )}
                >
                  <span className="font-display text-2xl leading-none">
                    {s.name}
                    <span className="align-super font-sans text-[10px] font-medium text-current/60">
                      {s.octave}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "mt-1 font-mono text-[10px] tracking-wide",
                      on ? "text-accent-fg/60" : "text-muted",
                    )}
                  >
                    {s.id} · {s.freq.toFixed(s.freq % 1 === 0 ? 0 : 1)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
