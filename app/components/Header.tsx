export default function Header() {
  return (
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
  );
}
