const services = [
  "Web Development",
  "Systems & Databases",
  "Mobile Applications",
  "AI Solutions",
  "Hosting & Domains",
  "IT & Networking",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div>
            <div className="text-2xl font-bold tracking-tight">
              <span className="text-blue-500">AJS</span>
              <span className="text-white"> Technologies</span>
            </div>
            <p className="mt-1 text-xs tracking-[0.2em] text-slate-500">
              ADVANCED JOINT SOLUTION
            </p>
          </div>

          <div className="hidden rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-2 text-sm text-blue-400 sm:block">
            Website in development
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10">
        <div className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-6 py-24 text-center">
          <div className="max-w-4xl">
            <div className="mx-auto mb-8 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
              AJS Technologies is under development
            </div>

            <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              We are building
              <span className="block text-blue-500">something meaningful.</span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">
              Our new website is currently being developed. AJS Technologies
              is working on modern digital solutions for businesses,
              organizations and individuals.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="mailto:info@ajstechnologies.com"
                className="w-full rounded-lg bg-blue-600 px-7 py-3.5 font-semibold transition hover:bg-blue-500 sm:w-auto"
              >
                Contact Us
              </a>

              <span className="w-full rounded-lg border border-white/10 px-7 py-3.5 text-slate-400 sm:w-auto">
                Full website coming soon
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">
              What we are building
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Technology solutions for real-world needs.
            </h2>

            <p className="mt-4 text-slate-400">
              Our services cover software, digital systems and IT solutions
              designed around practical problems.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service}
                className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 text-center text-sm text-slate-300 transition hover:border-blue-500/30 hover:bg-blue-500/[0.03]"
              >
                {service}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-center text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} AJS Technologies</p>
          <p>Advanced Joint Solution</p>
        </div>
      </footer>
    </main>
  );
}