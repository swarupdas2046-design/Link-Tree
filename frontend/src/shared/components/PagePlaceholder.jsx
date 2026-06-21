import { Link } from 'react-router'

const PagePlaceholder = ({ title, description }) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
      <section className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl shadow-black/30">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Linktree
        </p>
        <h1 className="mt-4 text-4xl font-bold">{title}</h1>
        <p className="mt-3 text-slate-300">{description}</p>

        <nav className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/login"
            className="rounded-full bg-cyan-400 px-5 py-2 font-semibold text-slate-950"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-full border border-white/15 px-5 py-2 font-semibold text-white"
          >
            Register
          </Link>
        </nav>
      </section>
    </main>
  )
}

export default PagePlaceholder
