"use client";

import { useState } from "react";

export default function Reports() {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const abuse_type = formData.get("abuse_type");
    const details = formData.get("details");

    try {
      const response = await fetch("/api/new-reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ abuse_type, details }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit report");
      }

      setSuccessMessage("Your information has been successfully submitted.");
      setError(null);

      // Clear the success message after a delay
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (err) {
      setError(err.message);
      setSuccessMessage(null);
    }
  };

  return (
    <section className="w-full py-6 md:py-12 lg:py-16">
      <div className="container grid items-start gap-8 px-4 md:px-6">
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <select
          name="abuse_type"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
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
          required
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
