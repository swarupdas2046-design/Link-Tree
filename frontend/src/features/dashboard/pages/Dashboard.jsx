import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import LoadingSpinner from "../../../shared/components/LoadingSpinner.jsx";
import useAuth from "../../auth/hooks/useAuth.js";
import { getMyLinks, createLink, deleteLink } from "../services/link.api.js";
// import { useNavigate } from "react-router";
const Dashboard = () => {
  const navigate = useNavigate();

  // const { user } = useAuth();
  const { user, logout } = useAuth();

  const [links, setLinks] = useState([]);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const profileUrl = `${window.location.origin}/${user?.username}`;

  const fetchLinks = async () => {
    try {
      const data = await getMyLinks();

      setLinks(data.links);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const data = await createLink({
        title,

        url,
      });

      setLinks((prev) => [data.link, ...prev]);

      setTitle("");

      setUrl("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteLink(id);

      setLinks((prev) => prev.filter((link) => link._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const copyProfileUrl = () => {
    navigator.clipboard.writeText(profileUrl);
  };

  if (loading) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#164e63_0%,#0f172a_42%,#020617_100%)] px-4 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Linktree
            </p>

            {/* <h1 className="mt-2 text-4xl font-bold">
              Welcome back, {user?.username} 👋
            </h1> */}
            <h1 className="mt-2 text-4xl font-bold">
              Hey,
              <span className="text-cyan-300"> {user?.username}</span>
              👋
            </h1>

            <p className="mt-2 text-slate-400">
              Manage your links and analytics
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/dashboard/trash")}
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm hover:bg-white/10"
            >
              🗑 Trash
            </button>

            <button
              onClick={() => navigate("/settings/username")}
              className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950"
            >
              ✏ Change Username
            </button>

            <button
              onClick={async () => {
                await logout();

                navigate("/login");
              }}
              className="rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold"
            >
              🚪 Logout
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* LEFT SIDE */}

          <div className="space-y-6 lg:col-span-1">
            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                Profile
              </p>

              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400 text-2xl font-bold text-slate-950">
                {user?.username?.charAt(0).toUpperCase()}
              </div>

              <h2 className="mt-3 text-xl font-bold">@{user?.username}</h2>

              <div className="mt-5 space-y-3">
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-xs text-slate-400">Public URL</p>

                  <p className="truncate text-sm">{profileUrl}</p>
                </div>

                <button
                  onClick={copyProfileUrl}
                  className="w-full rounded-xl bg-cyan-400 py-3 font-semibold text-slate-950 hover:bg-cyan-300"
                >
                  📋 Copy URL
                </button>

                <a
                  href={profileUrl}
                  target="_blank"
                  className="block w-full rounded-xl border border-white/10 py-3 text-center hover:bg-white/5"
                >
                  🚀 Visit Profile
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                Stats
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-3xl font-bold text-cyan-300">
                    🔗 {links.length}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">Active Links</p>
                </div>

                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-3xl font-bold">0</p>

                  <p className="mt-1 text-xs text-slate-400">Deleted</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 backdrop-blur-xl">
              <h2 className="text-2xl font-bold">➕ Create Link</h2>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Github"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan-400"
                />

                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://github.com/swarup"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan-400"
                />

                <button className="w-full rounded-xl bg-cyan-400 py-3 font-semibold text-slate-950 hover:bg-cyan-300">
                  {isSubmitting ? "Creating..." : "Add Link"}
                </button>
              </form>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 backdrop-blur-xl">
              <h2 className="text-2xl font-bold">🔗 Your Links</h2>

              <p className="mt-1 text-sm text-slate-400">
                Manage all your links here
              </p>

              {/* PART 3 YAHA AAYEGA */}
              {links.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-dashed border-white/10 p-8 text-center">
                  <div className="text-5xl">🔗</div>

                  <h3 className="mt-4 text-xl font-semibold">No links yet</h3>

                  <p className="mt-2 text-sm text-slate-400">
                    Create your first link above
                  </p>
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  {links.map((link) => (
                    <div
                      key={link._id}
                      className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition hover:border-cyan-400/40 hover:bg-white/[0.08]"
                    >
                      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {link.title}
                          </h3>

                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 block text-sm text-cyan-300 hover:underline"
                          >
                            {link.url}
                          </a>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() =>
                              navigate(`/dashboard/links/${link._id}/analytics`)
                            }
                            className="rounded-xl border border-cyan-400/40 px-4 py-2 text-sm text-cyan-300 transition hover:bg-cyan-400/10"
                          >
                            📈 Analytics
                          </button>

                          <button
                            onClick={() => handleDelete(link._id)}
                            className="rounded-xl border border-red-400/40 px-4 py-2 text-sm text-red-300 transition hover:bg-red-400/10"
                          >
                            🗑 Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
