"use client";
import { useState } from "react";
import type { Dictionaries } from "@/lib/i18n/dictionaries";
import { serviceSlugs } from "@/lib/services";

export default function ContactForm({
  t,
  selectedService = "",
}: {
  t: Dictionaries["contact"];
  selectedService?: string;
}) {
  const [inquiry, setInquiry] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const email = "info@ajstechnologies.com";
  return (
    <form
      data-reveal
      className="contact-form"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const serviceIndex = serviceSlugs.indexOf(
          data.get("service") as (typeof serviceSlugs)[number],
        );
        const service =
          t.serviceOptions[serviceIndex === -1 ? 6 : serviceIndex];
        const body = `${t.name}: ${String(data.get("name")).trim()}\n${t.email}: ${data.get("email")}\n${t.company}: ${String(data.get("company")).trim()}\n${t.service}: ${service}\n\n${String(data.get("message")).trim()}`;
        setInquiry(body);
        setCopyMessage("");
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(t.subject + " — " + String(data.get("name")).trim())}&body=${encodeURIComponent(body)}`;
      }}
    >
      <div className="form-heading">
        <h2>{t.formTitle}</h2>
        <span aria-hidden="true">↗</span>
      </div>
      <div className="form-row">
        <label>
          {t.name}
          <input
            name="name"
            autoComplete="name"
            placeholder={t.namePlaceholder}
            required
            maxLength={100}
          />
        </label>
        <label>
          {t.email}
          <input
            name="email"
            autoComplete="email"
            type="email"
            dir="ltr"
            placeholder={t.emailPlaceholder}
            required
            maxLength={254}
          />
        </label>
      </div>
      <label>
        {t.company}
        <input
          name="company"
          autoComplete="organization"
          placeholder={t.companyPlaceholder}
          maxLength={150}
        />
      </label>
      <label>
        {t.service}
        <select
          name="service"
          defaultValue={
            serviceSlugs.includes(
              selectedService as (typeof serviceSlugs)[number],
            )
              ? selectedService
              : ""
          }
          required
        >
          <option value="" disabled>
            {t.servicePlaceholder}
          </option>
          {t.serviceOptions.map((service, index) => (
            <option key={index} value={serviceSlugs[index] || "other"}>
              {service}
            </option>
          ))}
        </select>
      </label>
      <label>
        {t.message}
        <textarea
          name="message"
          placeholder={t.messagePlaceholder}
          rows={4}
          required
          maxLength={3000}
        />
      </label>
      <button className="button primary" type="submit">
        {t.submit}
        <span aria-hidden="true">↗</span>
      </button>
      <p className="form-note">{t.note}</p>
      {inquiry && (
        <section className="inquiry-result" aria-live="polite">
          <h3>{t.readyTitle}</h3>
          <p>{t.readyText}</p>
          <textarea
            readOnly
            aria-label={t.inquiryLabel}
            value={inquiry}
            rows={6}
          />
          <button
            type="button"
            className="button secondary"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(inquiry);
                setCopyMessage(t.copied);
              } catch {
                setCopyMessage(t.copyFailed);
              }
            }}
          >
            {t.copy}
          </button>
          <p role="status">{copyMessage}</p>
        </section>
      )}
    </form>
  );
}
