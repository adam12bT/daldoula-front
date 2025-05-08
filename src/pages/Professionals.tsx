import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";
import { addProduct } from "../service/service";

const Professionals = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    deadline: "",
    status: "open",
    posterID: "", // will be updated after decoding token
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode<{ id: string }>(token);
        console.log("Decoded Token:", decodedToken);
        setFormData((prev) => ({ ...prev, posterID: decodedToken.id }));
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      console.error("No token found");
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newProduct = await addProduct(formData);
      console.log("Product added:", newProduct);
      alert("Product successfully created!");
      // Optionally reset the form
    } catch (error: any) {
      console.error(error.message);
      alert("Failed to create product: " + error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm p-6 space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-900">Create a Post</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Budget ($)</label>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="open">Open</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="pt-4 flex justify-end space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
          <button
            type="reset"
            className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-100"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Professionals;
