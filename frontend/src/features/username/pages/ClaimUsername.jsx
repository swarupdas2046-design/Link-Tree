import { useState } from "react";

import { claimUsername } from "../services/username.api";

const ClaimUsername = () => {
  const [username, setUsername] = useState("");

  const submit = async () => {
    await claimUsername(username);

    alert("Username Updated");
  };

  return (
    <main className="min-h-screen bg-slate-950 flex justify-center items-center">
      <div className="bg-slate-900 p-8 rounded-2xl">
        <h1 className="text-3xl text-white">Claim Username</h1>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-5 w-full rounded-xl p-3"
          placeholder="new username"
        />

        <button
          onClick={submit}
          className="mt-5 w-full rounded-xl bg-cyan-400 p-3"
        >
          Update
        </button>
      </div>
    </main>
  );
};

export default ClaimUsername;
