import { sql } from "@vercel/postgres";

export async function GET() {
  const reports = await sql`SELECT * FROM reports ORDER BY submitted_at DESC`;
  return new Response(
    JSON.stringify(reports.rows.length > 0 ? reports.rows : []),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function POST(req) {
  try {
    const { abuse_type, details } = await req.json();

    if (!abuse_type || !details) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await sql`INSERT INTO reports (abuse_type, details) VALUES (${abuse_type}, ${details})`;

    const reports = await sql`SELECT * FROM reports ORDER BY submitted_at DESC`;
    return new Response(JSON.stringify(reports.rows), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid JSON input" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
