// import { sql } from "@vercel/postgres";

// export async function GET(request, { params }) {
//   const reports = await sql`SELECT * FROM reports WHERE id = ${params.id}`;

//   return Response.json(reports.rows.length > 0 ? reports.rows : null);
// }

// export async function POST(req, { params }) {
//   const { abuse_type, details } = await req.json();

//   const insertResponse =
//     await sql`INSERT INTO reports (abuse_type, details) VALUES (${abuse_type}, ${details})`;

//   const reports = await sql`SELECT * FROM reports WHERE id = ${params.id}`;

//   return Response.json(reports.rows);
// }
import { sql } from "@vercel/postgres";

export async function GET(request, { params }) {
  const reviews =
    await sql`select * from reviews where ref_product = ${params.id}`;

  return Response.json(reviews.rows.length > 0 ? reviews.rows : null);
}

export async function POST(req, { params }) {
  const { name, text } = await req.json();

  const insertResponse =
    await sql`insert into reviews (name, text, ref_product) values (${name}, ${text}, ${params.id})`;

  const reviews =
    await sql`select * from reviews where ref_product = ${params.id}`;

  return Response.json(reviews.rows);
}
