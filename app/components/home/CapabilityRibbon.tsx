import type { Dictionaries } from "@/lib/i18n/dictionaries";

export default function CapabilityRibbon({
  t,
  label,
}: {
  t: Dictionaries["services"];
  label: string;
}) {
  return (
    <section className="capability-ribbon" aria-label={label}>
      <div className="ribbon-track">
        {[0, 1].map((copy) => (
          <div
            className="ribbon-group"
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
          >
            {t.items.map((item) => (
              <span key={item.title}>
                {item.title}
                <i aria-hidden="true">✳</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
