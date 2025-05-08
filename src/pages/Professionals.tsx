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
  className="bg-white rounded-xl shadow-md p-8 space-y-6 border border-gray-100"
>
  <h2 className="text-3xl font-extrabold text-gray-900">Create a Post</h2>

  {/* Title */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
    <input
      type="text"
      name="title"
      value={formData.title}
      onChange={handleChange}
      required
      className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base"
      placeholder="e.g. Need a plumber for kitchen sink"
    />
  </div>

  {/* Description */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
    <textarea
      name="description"
      rows={5}
      value={formData.description}
      onChange={handleChange}
      required
      className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base"
      placeholder="Provide a clear description of the task"
    ></textarea>
  </div>

  {/* Category */}
  <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
  <select
    name="category"
    value={formData.category}
    onChange={handleChange}
    required
    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base"
  >
    <option value="">Select a category</option>
    <option value="Electrical">Electrical</option>
    <option value="Plumbing">Plumbing</option>
    <option value="Cleaning">Cleaning</option>
    <option value="Carpentry">Carpentry</option>
    <option value="Gardening">Gardening</option>
    <option value="Car Pooling">Car Pooling</option>
    <option value="Development">Development</option>
  </select>
</div>

  {/* Budget */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Budget ($)</label>
    <input
      type="number"
      name="budget"
      value={formData.budget}
      onChange={handleChange}
      required
      className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base"
      placeholder="e.g. 100"
    />
  </div>

  {/* Deadline */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
    <input
      type="date"
      name="deadline"
      value={formData.deadline}
      onChange={handleChange}
      className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base"
    />
  </div>

  {/* Status */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
    <select
      name="status"
      value={formData.status}
      onChange={handleChange}
      className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base"
    >
      <option value="open">Open</option>
      <option value="in progress">In Progress</option>
      <option value="completed">Completed</option>
      <option value="closed">Closed</option>
    </select>
  </div>

  {/* Buttons */}
  <div className="pt-6 flex justify-end space-x-4">
    <button
      type="submit"
      className="bg-blue-600 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-blue-700 transition"
    >
      Submit
    </button>
    <button
      type="reset"
      className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md text-base font-medium hover:bg-gray-100 transition"
    >
      Reset
    </button>
  </div>
</form>

    </div>
  );
};

export default Professionals;
