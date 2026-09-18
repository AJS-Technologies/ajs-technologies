import Link from "next/link";
import { localizedPath, type Locale } from "@/lib/i18n/config";
import type { Dictionaries } from "@/lib/i18n/dictionaries";
import { serviceIcons, serviceSlugs, serviceVisuals } from "@/lib/services";
import ServiceArt from "./ServiceArt";

export default function ServiceGrid({
  locale,
  t,
  limit = 6,
}: {
  locale: Locale;
  t: Dictionaries["services"];
  limit?: number;
}) {
  return (
    <div className="services-grid">
      {t.items.slice(0, limit).map((service, index) => (
        <Link
          href={localizedPath(locale, `services/${serviceSlugs[index]}`)}
          key={serviceSlugs[index]}
          className={`service-card service-${serviceVisuals[index]}`}
          data-reveal
        >
          <div className="service-top">
            <span className="service-icon" aria-hidden="true">
              {serviceIcons[index]}
            </span>
            <span className="card-arrow" aria-hidden="true">
              ↗
            </span>
          </div>
          <ServiceArt kind={serviceVisuals[index]} />
          <div className="service-content">
            <span className="service-index">
              0{index + 1} / {t.indexLabel}
            </span>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
            <div className="tags">
              {service.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
