import React, { useState } from "react";

function ViewStock() {
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch(`http://localhost:5000/api/components/${category}`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">View Stock</h2>

      {/* Select Category */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded mr-4"
      >
        <option value="">Select Component</option>
        <option value="capacitor">Capacitor</option>
        <option value="resistor">Resistor</option>
        <option value="ic">IC</option>
      </select>

      <button
        onClick={fetchData}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Load Data
      </button>

      {/* Table */}
      <table className="w-full border-collapse border border-gray-300 mt-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Part No</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td className="border px-4 py-2">{item.partNo}</td>
              <td className="border px-4 py-2">{item.description}</td>
              <td className="border px-4 py-2">{item.quantity}</td>
              <td className="border px-4 py-2">${item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewStock;
