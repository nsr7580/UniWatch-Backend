import Reports from "./Reports";

export default function ReportPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-5xl tracking-tighter text-center">
        Political Abuse Reporting (Anonymous)
      </h1>
      <Reports />
      <a href="/with-new-client-components/all-reports">View All Reports</a>
    </div>
  );
}
