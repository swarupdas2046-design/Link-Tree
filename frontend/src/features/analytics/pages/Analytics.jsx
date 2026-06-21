import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAnalytics } from "../services/analytics.api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import LoadingSpinner from "../../../shared/components/LoadingSpinner";

const Analytics = () => {
  const { linkId } = useParams();

  const [analytics, setAnalytics] = useState([]);

  const [title, setTitle] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalytics(linkId);

        setAnalytics(data.analytics);

        setTitle(data.link.title);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const totalClicks = analytics.reduce(
    (acc, item) => acc + item.clicks,

    0,
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold">📈 {title}</h1>

        <p className="mt-2 text-slate-400">Last 7 days analytics</p>

        <div className="mt-6 rounded-xl bg-white/5 p-5">
          <h2 className="text-2xl font-bold">Total Clicks :{totalClicks}</h2>
        </div>

        <div className="mt-8 h-[400px] rounded-xl bg-white/5 p-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics}>
              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip />

              <Line dataKey="clicks" stroke="#06b6d4" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
};

export default Analytics;
