import Reports from "../app/with-new-client-components/Reports";

export default function ReportPage() {
  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Political Abuse Reporting (Anonymous)</h1>
        <Reports />
        <a href="/with-new-client-components/all-reports" style={styles.link}>
          View All Reports
        </a>
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
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    width: "100%",
    textAlign: "center",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  link: {
    display: "inline-block",
    marginTop: "20px",
    textDecoration: "none",
    color: "#0070f3",
    fontWeight: "500",
    padding: "10px 20px",
    borderRadius: "8px",
    backgroundColor: "#0070f3",
    color: "#ffffff",
    transition: "background-color 0.3s ease",
  },
};

styles.link[":hover"] = {
  backgroundColor: "#005bb5",
};
