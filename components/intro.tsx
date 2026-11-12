// Opening beat: the mark and wordmark resolve on black, then the overlay
// fades away on its own. It's pure CSS, so it can't get stuck if scripts fail.
export default function Intro() {
  return (
    <div
      aria-hidden
      className="intro-overlay pointer-events-none fixed inset-0 z-[60] flex flex-col items-center justify-center gap-6 bg-ink"
    >
      <img src="/brand/pius-and-noble-logo.png" alt="" className="intro-mark h-24 w-24 md:h-32 md:w-32" />
      <p className="intro-word font-display text-sm font-bold text-paper md:text-base">
        PIUS <span className="text-gold">&amp;</span> NOBLE LP
      </p>
    </div>
  );
}
