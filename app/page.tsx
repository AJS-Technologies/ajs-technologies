const services = [
  {
    title: "Web Development",
    description:
      "Modern, fast and scalable websites and web applications built around your needs.",
  },
  {
    title: "Systems & Databases",
    description:
      "Reliable business systems and database solutions that help organizations work smarter.",
  },
  {
    title: "Mobile Applications",
    description:
      "Custom Android and iOS applications designed for real-world business needs.",
  },
  {
    title: "AI Solutions",
    description:
      "Practical AI-powered solutions that automate tasks and improve the way you work.",
  },
  {
    title: "Hosting & Domains",
    description:
      "Professional hosting, domain registration and deployment solutions.",
  },
  {
    title: "IT & Networking",
    description:
      "Networking, infrastructure and technical solutions for organizations and businesses.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div className="text-2xl font-bold tracking-tight">
            <span className="text-blue-500">AJS</span> Technologies
          </div>

          <div className="hidden gap-8 text-sm text-slate-300 md:flex">
            <a href="#services" className="transition hover:text-white">
              Services
            </a>
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
          </div>

          <a
            href="#contact"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-blue-500"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.18),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-36">
          <div className="max-w-4xl">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">
              Advanced Joint Solution
            </p>

            <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Technology that
              <span className="block text-blue-500">solves real problems.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400">
              AJS Technologies builds modern digital solutions for businesses,
              organizations and individuals — from websites and systems to
              mobile applications, AI and IT infrastructure.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#services"
                className="rounded-lg bg-blue-600 px-7 py-3.5 text-center font-semibold transition hover:bg-blue-500"
              >
                Explore Our Services
              </a>

              <a
                href="#contact"
                className="rounded-lg border border-white/15 px-7 py-3.5 text-center font-semibold text-slate-200 transition hover:bg-white/5"
              >
                Talk to Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">
              What we do
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight">
              Digital solutions built for your needs.
            </h2>

            <p className="mt-5 text-slate-400">
              We combine software, technology and practical problem-solving to
              create solutions that make organizations more efficient.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-1 hover:border-blue-500/40"
              >
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-500">
                  <span className="text-lg">+</span>
                </div>

                <h3 className="text-xl font-semibold">{service.title}</h3>

                <p className="mt-3 leading-7 text-slate-400">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">
                About AJS
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-tight">
                Building technology with purpose.
              </h2>
            </div>

            <div className="text-lg leading-8 text-slate-400">
              <p>
                AJS Technologies is a technology company focused on developing
                practical digital solutions that help people, businesses and
                organizations move forward.
              </p>

              <p className="mt-5">
                From software development to infrastructure and emerging
                technologies, we focus on understanding the problem first and
                building the right solution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="rounded-3xl border border-blue-500/20 bg-blue-600/10 p-10 text-center sm:p-16">
            <h2 className="text-4xl font-bold tracking-tight">
              Have a project in mind?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-slate-400">
              Tell us what you are trying to build. Let&apos;s find the right
              technology and turn the idea into a working solution.
            </p>

            <a
              href="mailto:info@ajstechnologies.com"
              className="mt-8 inline-block rounded-lg bg-blue-600 px-7 py-3.5 font-semibold transition hover:bg-blue-500"
            >
              Contact AJS Technologies
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} AJS Technologies. All rights reserved.</p>
          <p>Advanced Joint Solution</p>
        </div>
      </footer>
    </main>
  );
}