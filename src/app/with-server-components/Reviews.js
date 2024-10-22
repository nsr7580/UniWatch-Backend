import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

const getReviews = async (id) => {
  const reviews = await sql`SELECT * FROM reviews WHERE ref_product = ${id}`;
  return reviews.rows ? reviews.rows : [];
};

export default async function Reviews(props) {
  const submitForm = async (formData) => {
    "use server";
    await sql`INSERT INTO reviews (name, text, ref_product) VALUES (${formData.get(
      "name"
    )}, ${formData.get("text")}, ${formData.get("id")})`;
    revalidatePath("/with-server-components");
  };

  const data = await getReviews(props.id);

  return (
    <section className="w-full py-6 md:py-12 lg:py-16">
      <div className="container grid items-start gap-8 px-4 md:px-6">
        {data &&
          data.map(({ id, name, text }) => (
            <div key={id} className="border-2 rounded-lg p-4 border-gray-200">
              <p className="font-semibold">{name}</p>
              <p className="text-gray-600">{text}</p>
            </div>
          ))}
      </div>
      <form action={submitForm} className="mt-8 space-y-4">
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <textarea
          placeholder="Write a review..."
          name="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        ></textarea>
        <input type="hidden" value={props.id} name="id" />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit Review
        </button>
      </form>
    </section>
  );
}
