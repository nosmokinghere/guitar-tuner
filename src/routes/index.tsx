import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";
import { GuitarNeck } from "@/components/guitar-neck";
import { TunerPanel } from "@/components/tuner-panel";
import { playString, setMasterVolume, unlockAudio } from "@/lib/audio";
import { type GuitarString } from "@/lib/strings";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState<GuitarString | null>(null);
  const [volume, setVolume] = useState(0.72);

  useEffect(() => {
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

  function pick(s: GuitarString) {
    unlockAudio();
    playString(s.freq);
    setActive(s);
  }

  function onVolume(v: number) {
    setVolume(v);
    unlockAudio();
    setMasterVolume(v);
  }

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-3xl flex-col px-4 pb-10 pt-6 sm:px-6 sm:pt-10">
      <header className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
            Reference pitch
          </p>
          <h1 className="font-display text-4xl leading-tight tracking-tight text-fg sm:text-5xl">
            Pegbox
          </h1>
        </div>
        <label className="flex items-center gap-2 pt-2 text-muted">
          <Volume2 className="size-4" strokeWidth={1.75} aria-hidden />
          <span className="sr-only">Volume</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => onVolume(Number(e.target.value))}
            className="h-1 w-20 accent-accent sm:w-28"
            aria-label="Volume"
          />
        </label>
      </header>

      <div className="mb-5 rounded-[26px] bg-raised p-2 shadow-[var(--shadow-border)] sm:p-2.5">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex min-h-11 w-full items-center justify-between rounded-xl px-3 text-left text-fg transition-colors duration-150 hover:bg-surface"
        >
          <span className="flex items-baseline gap-3">
            <span className="text-sm font-medium">Tuner</span>
            <span className="font-mono text-[11px] text-muted">
              {active
                ? `${active.label} · ${active.freq.toFixed(2)} Hz`
                : "six strings"}
            </span>
          </span>
          <ChevronDown
            className={cn(
              "size-4 text-muted transition-transform duration-250 ease-[var(--ease-out-smooth)]",
              open && "rotate-180",
            )}
            strokeWidth={1.75}
          />
        </button>
        <div className="px-1 pb-1 pt-1">
          <TunerPanel open={open} activeId={active?.id ?? null} onPick={pick} />
        </div>
      </div>

      <GuitarNeck activeId={active?.id ?? null} onPick={pick} />

      <p className="mt-auto pt-8 text-center text-xs text-subtle">
        Tap a string to hear the concert pitch. Match your guitar to it.
      </p>
    </main>
  );
}
