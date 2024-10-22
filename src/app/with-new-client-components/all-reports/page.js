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
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        <h1 style={styles.heading}>All Previous Complaints</h1>
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Abuse Type</th>
                <th style={styles.th}>Details</th>
                <th style={styles.th}>Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map(({ id, abuse_type, details, submitted_at }) => (
                  <tr key={id} style={styles.tr}>
                    <td style={styles.td}>{abuse_type}</td>
                    <td style={styles.td}>{details}</td>
                    <td style={styles.td}>
                      {new Date(submitted_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={styles.noReports}>
                    No reports available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f4f4",
    padding: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "90%",
    width: "100%",
    textAlign: "center",
  },
  heading: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  error: {
    color: "#ff0000",
    marginBottom: "20px",
  },
  tableContainer: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  th: {
    padding: "8px",
    borderBottom: "2px solid #ddd",
    backgroundColor: "#f9f9f9",
    fontWeight: "bold",
    textAlign: "center",
  },
  tr: {
    transition: "background-color 0.2s ease",
  },
  td: {
    padding: "8px",
    borderBottom: "1px solid #ddd",
    textAlign: "center",
  },
  noReports: {
    padding: "20px",
    color: "#777",
    textAlign: "center",
  },
};

styles.tr[":hover"] = {
  backgroundColor: "#f1f1f1",
};
