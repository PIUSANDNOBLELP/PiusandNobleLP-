// Contact details are placeholders until the firm confirms them.

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:grid-cols-[1.4fr_1fr_1fr] md:px-10">
        <div>
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-mark.png" alt="" className="h-14 w-14" />
            <p className="font-display text-2xl font-black leading-none">
              PIUS <span className="text-gold">&amp;</span> NOBLE LP
            </p>
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/60">
            Delivering trusted legal solutions with global standards and innovative legal solutions.
          </p>
        </div>
        <div className="text-sm text-paper/70">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-gold">Office</p>
          <p>Abuja, Federal Capital Territory</p>
          <p className="mt-1 text-paper/40">[Street address: to confirm with firm]</p>
        </div>
        <div className="text-sm text-paper/70">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-gold">Follow</p>
          <a href="https://www.linkedin.com/company/piusandnoble/" className="block transition-colors hover:text-gold">
            LinkedIn
          </a>
          <a href="https://www.instagram.com/piusandnoblelp/" className="mt-2 block transition-colors hover:text-gold">
            Instagram
          </a>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <p className="mx-auto max-w-7xl px-6 py-6 text-xs text-paper/40 md:px-10">
          © {new Date().getFullYear()} Pius &amp; Noble LP. Proposal draft, not for publication. Stock photos from{" "}
          <a href="https://unsplash.com" className="underline hover:text-gold">Unsplash</a>.
        </p>
      </div>
    </footer>
  );
}
