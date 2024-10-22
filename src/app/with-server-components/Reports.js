import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

const getReports = async () => {
  const reports = await sql`SELECT * FROM reports`;
  return reports.rows ? reports.rows : [];
};

export default async function Reports() {
  const submitForm = async (formData) => {
    "use server";
    await sql`INSERT INTO reports (abuse_type, details) VALUES (${formData.get(
      "abuse_type"
    )}, ${formData.get("details")})`;
    revalidatePath("/with-server-components");
  };

  const data = await getReports();

  return (
    <section className="w-full py-6 md:py-12 lg:py-16">
      <div className="container grid items-start gap-8 px-4 md:px-6">
        {data &&
          data.map(({ id, abuse_type, details, submitted_at }) => (
            <div key={id} className="border-2 rounded-lg p-4 border-gray-200">
              <p className="font-semibold">{abuse_type}</p>
              <p className="text-gray-600">{details}</p>
              <p className="text-gray-500 text-sm mt-2">
                Submitted at: {submitted_at}
              </p>
            </div>
          ))}
      </div>
      <form action={submitForm} className="mt-8 space-y-4">
        <select
          name="abuse_type"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select abuse type</option>
          <option value="Corruption">Corruption</option>
          <option value="Police Brutality">Police Brutality</option>
          <option value="Freedom of Speech Violation">
            Freedom of Speech Violation
          </option>
          <option value="Electoral Fraud">Electoral Fraud</option>
          <option value="Discrimination">Discrimination</option>
        </select>
        <textarea
          placeholder="Provide details..."
          name="details"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        ></textarea>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit Report
        </button>
      </form>
    </section>
  );
}
