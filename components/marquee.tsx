// Slow scrolling band of the seven practice areas, sitting between hero and content.
const items = [
  "Artificial Intelligence",
  "Dispute Resolution",
  "Corporate & Commercial",
  "Data Privacy Advisory",
  "Intellectual Property",
  "Entertainment Law",
  "Real Estate",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-ink/15 bg-paper py-6" aria-label="Practice areas">
      <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="font-display flex items-center gap-12 text-3xl font-bold uppercase tracking-tight md:text-5xl">
            {item}
            <span className="text-gold" aria-hidden>
              ✶
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
