export default function Faq({
  title,
  items,
}: {
  title: string;
  items: { question: string; answer: string }[];
}) {
  return (
    <section className="faq-section" data-reveal>
      <h2>{title}</h2>
      <div className="faq-list">
        {items.map((item) => (
          <details key={item.question}>
            <summary>
              {item.question}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
