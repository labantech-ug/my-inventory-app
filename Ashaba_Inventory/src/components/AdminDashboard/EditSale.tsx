import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Sale {
  id: number;
  itemName: string;
  quantity: number;
  priceSold: number;
}

const EditSale: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sale, setSale] = useState<Sale | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchSale = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/sales/${id}`);
        setSale(response.data);
      } catch (error) {
        console.error('Error fetching sale:', error);
        setError('Error fetching sale');
      }
    };
    fetchSale();
  }, [id]);

  const handleSave = async () => {
    if (!sale) return;

    try {
      await axios.put(`http://localhost:5000/sales/${id}`, sale);
      setSuccess('Sale edited successfully!');
      setTimeout(() => {
        navigate('/admin-dashboard'); // Redirect after showing the success message
      }, 2000); // Adjust the delay as needed
    } catch (error) {
      console.error('Error saving sale:', error);
      setError('Error saving sale');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Edit Sale</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      {sale ? (
        <form className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Item Name:</label>
            <input
              type="text"
              value={sale.itemName}
              onChange={(e) => setSale({ ...sale, itemName: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Quantity:</label>
            <input
              type="number"
              value={sale.quantity}
              onChange={(e) => setSale({ ...sale, quantity: Number(e.target.value) })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Price Sold:</label>
            <input
              type="number"
              value={sale.priceSold}
              onChange={(e) => setSale({ ...sale, priceSold: Number(e.target.value) })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
            />
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Save
          </button>
        </form>
      ) : (
        <p>Loading sale data...</p>
      )}
    </div>
  );
};

export default EditSale;