"use client";

import { useEffect, useState } from "react";

export default function AllReportsPage() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReports() {
      try {
        const response = await fetch("/api/new-reports");
        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }
        const data = await response.json();
        setReports(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchReports();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-5xl tracking-tighter text-center">
        All Previous Complaints
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="container mx-auto py-6">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 border-b border-gray-200">Abuse Type</th>
              <th className="py-2 border-b border-gray-200">Details</th>
              <th className="py-2 border-b border-gray-200">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map(({ id, abuse_type, details, submitted_at }) => (
                <tr key={id}>
                  <td className="py-2 border-b border-gray-200 text-center">
                    {abuse_type}
                  </td>
                  <td className="py-2 border-b border-gray-200 text-center">
                    {details}
                  </td>
                  <td className="py-2 border-b border-gray-200 text-center">
                    {new Date(submitted_at).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-4 text-center text-gray-500">
                  No reports available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
