import { useEffect, useState } from "react";

import { getDeletedLinks, restoreLink, purgeLink } from "../services/trash.api";

const Trash = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

 const fetchData = async () => {
  try {
    const data = await getDeletedLinks();

    console.log(data);

    setLinks(data.links || []);
  } catch (error) {
    console.log(error);
  }
};

  const handleRestore = async (id) => {
    await restoreLink(id);

    setLinks((prev) => prev.filter((i) => i._id !== id));
  };

  const handleDelete = async (id) => {
    await purgeLink(id);

    setLinks((prev) => prev.filter((i) => i._id !== id));
  };

  return (
    <main className="min-h-screen bg-slate-950 p-10 text-white">
      <h1 className="mb-8 text-4xl font-bold">🗑 Trash</h1>

      <div className="space-y-4">
        {links.map((link) => (
          <div
            key={link._id}
            className="rounded-xl bg-slate-900 p-5 flex justify-between"
          >
            <div>
              <h2>{link.title}</h2>

              <p>{link.url}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleRestore(link._id)}
                className="bg-green-500 px-4 py-2 rounded-xl"
              >
                Restore
              </button>

              <button
                onClick={() => handleDelete(link._id)}
                className="bg-red-500 px-4 py-2 rounded-xl"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Trash;
