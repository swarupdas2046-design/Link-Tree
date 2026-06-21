import { useEffect, useState } from "react";
import { useParams } from "react-router";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import { getUserLinks, recordClick } from "../services/home.api";

const Home = () => {
  const { username } = useParams();

  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const data = await getUserLinks(username);

      setLinks(data.links);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async (link) => {
    try {
      await recordClick(link._id);
    } catch (err) {
      console.log(err);
    }

    window.open(link.url, "_blank");
  };

  if (loading) {
    return <LoadingSpinner message="Loading profile..." />;
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#164e63_0%,#0f172a_40%,#020617_100%)] flex items-center justify-center p-5">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/70 p-8 backdrop-blur-xl">
        <div className="flex flex-col items-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-cyan-400 text-4xl font-bold text-slate-950">
            {username?.charAt(0).toUpperCase()}
          </div>

          <h1 className="mt-4 text-4xl font-bold text-white">@{username}</h1>

          <p className="mt-2 text-slate-400">Linktree Profile</p>
        </div>

        <div className="mt-8 space-y-4">
          {links.length === 0 ? (
            <div className="rounded-xl bg-white/5 p-6 text-center">
              <p className="text-slate-400">No links available</p>
            </div>
          ) : (
            links.map((link) => (
              <button
                key={link._id}
                onClick={() => handleClick(link)}
                className="w-full rounded-2xl bg-cyan-400 py-4 font-semibold text-slate-950 transition hover:scale-[1.02] hover:bg-cyan-300"
              >
                {link.title}
              </button>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
