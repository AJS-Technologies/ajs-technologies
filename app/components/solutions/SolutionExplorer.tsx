"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { localizedPath, languageTags, type Locale } from "@/lib/i18n/config";
import type { Dictionaries } from "@/lib/i18n/dictionaries";

const metrics = [
  [48250, 128, 24],
  [12840, 38520, 642],
  [1240, 18, 86],
];
const charts = [
  [35, 55, 42, 70, 59, 82, 72, 95, 78, 100, 87, 112],
  [24, 42, 30, 62, 50, 73, 62, 90, 76, 98, 90, 120],
  [30, 38, 54, 45, 78, 60, 88, 75, 108, 95, 112, 124],
];
export default function SolutionExplorer({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionaries["solutions"];
}) {
  const [active, setActive] = useState(0);
  const solution = t.items[active];
  const format = new Intl.NumberFormat(languageTags[locale]);
  return (
    <div>
      <div className="solution-tabs" role="tablist" aria-label={t.tabsLabel}>
        {t.items.map((item, index) => (
          <button
            key={index}
            id={`tab-${index}`}
            role="tab"
            aria-selected={active === index}
            aria-controls="solution-panel"
            tabIndex={active === index ? 0 : -1}
            className={active === index ? "active" : ""}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              const forward = locale === "en" ? "ArrowRight" : "ArrowLeft";
              const backward = locale === "en" ? "ArrowLeft" : "ArrowRight";
              const next =
                event.key === forward
                  ? (index + 1) % 3
                  : event.key === backward
                    ? (index + 2) % 3
                    : event.key === "Home"
                      ? 0
                      : event.key === "End"
                        ? 2
                        : null;
              if (next === null) return;
              event.preventDefault();
              setActive(next);
              document.getElementById(`tab-${next}`)?.focus();
            }}
          >
            {item.name}
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <div
        id="solution-panel"
        role="tabpanel"
        aria-labelledby={`tab-${active}`}
        tabIndex={0}
        className="solution-panel"
      >
        <div className="solution-copy" key={active}>
          <span className="eyebrow">{solution.badge}</span>
          <h3>{solution.heading}</h3>
          <p>{solution.text}</p>
          <ul>
            {solution.features.map((feature) => (
              <li key={feature}>
                <span aria-hidden="true">✓</span>
                {feature}
              </li>
            ))}
          </ul>
          <Link
            href={localizedPath(
              locale,
              `contact?service=${["business-systems", "web-development", "ai-automation"][active]}`,
            )}
            className="text-link"
          >
            {t.action}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="dashboard">
          <div className="dashboard-top">
            <div className="dashboard-brand">
              <Image
                src="/ASJ%20Logo/ASJ_POR_BLUE_LogoWithoutText.svg"
                alt=""
                width={21}
                height={21}
              />
              {t.workspace}
              <span>/ {t.overview}</span>
            </div>
            <span className="demo-label">{t.concept}</span>
          </div>
          <div className="dashboard-body">
            <div className="dashboard-title">
              <div>
                <small>{t.glance}</small>
                <h4>{solution.label}</h4>
              </div>
              <span>{t.period}</span>
            </div>
            <div className="dashboard-stats">
              {solution.stats.map((label, index) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong dir="ltr">
                    {active === 0 && index === 0
                      ? new Intl.NumberFormat(languageTags[locale], {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 0,
                        }).format(metrics[active][index])
                      : format.format(metrics[active][index])}
                  </strong>
                  <small>{t.sampleMetric}</small>
                </div>
              ))}
            </div>
            <div className="chart-top">
              <span>{t.activity}</span>
              <small>
                <i />
                {t.thisPeriod}
              </small>
            </div>
            <div className="chart" aria-hidden="true">
              {charts[active].map((height, index) => (
                <div
                  key={index}
                  style={
                    {
                      "--bar-height": `${height}px`,
                      "--bar-delay": `${index * 35}ms`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
            <div className="chart-axis" aria-hidden="true">
              {[1, 2, 3, 4].map((week) => (
                <span key={week}>
                  {t.week} {format.format(week)}
                </span>
              ))}
            </div>
            <div className="dashboard-note">
              <i className="online-dot" />
              {t.onePlace}
              <span>{t.connected} ↗</span>
            </div>
          </div>
        </div>
      </div>
      <p className="concept-note">{t.sampleNote}</p>
    </div>
  );
}
