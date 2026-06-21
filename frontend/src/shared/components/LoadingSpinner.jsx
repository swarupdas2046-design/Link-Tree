const LoadingSpinner = ({ message = 'Loading your Linktree...' }) => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 text-white">
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />

      <section className="relative flex w-full max-w-sm flex-col items-center rounded-3xl border border-white/10 bg-white/5 px-8 py-10 text-center shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-white/10" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-cyan-300 border-r-violet-400" />
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan-300 to-violet-400 shadow-lg shadow-cyan-400/20" />
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
          Linktree
        </p>
        <p className="mt-3 text-sm text-slate-300">{message}</p>
      </section>
    </main>
  )
}

export default LoadingSpinner
