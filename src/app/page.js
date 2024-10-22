import Reviews from "../app/with-server-components/Reviews";

export default function ProductPage() {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Product Reviews</h2>
      <Reviews id={1} />
    </div>
  );
}
