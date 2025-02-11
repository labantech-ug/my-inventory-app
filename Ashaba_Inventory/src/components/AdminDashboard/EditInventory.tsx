import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface InventoryItem {
  id: number;
  itemName: string;
  quantity: number;
  priceBought: number;
}

const EditInventory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [inventoryItem, setInventoryItem] = useState<InventoryItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventoryItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/inventory/${id}`);
        setInventoryItem(response.data);
      } catch (error) {
        console.error('Error fetching inventory item:', error);
        setError('Error fetching inventory item');
      }
    };
    fetchInventoryItem();
  }, [id]);

  const handleSave = async () => {
    if (!inventoryItem) return;

    try {
      await axios.put(`http://localhost:5000/inventory/${id}`, inventoryItem);
      setSuccess('Inventory item edited successfully!');
      setTimeout(() => {
        navigate('/admin-dashboard'); // Redirect after showing the success message
      }, 2000); // Adjust the delay as needed
    } catch (error) {
      console.error('Error saving inventory item:', error);
      setError('Error saving inventory item');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Edit Inventory Item</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      {inventoryItem ? (
        <form className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Item Name:</label>
            <input
              type="text"
              value={inventoryItem.itemName}
              onChange={(e) => setInventoryItem({
                ...inventoryItem,
                itemName: e.target.value
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Quantity:</label>
            <input
              type="number"
              value={inventoryItem.quantity}
              onChange={(e) => setInventoryItem({
                ...inventoryItem,
                quantity: Number(e.target.value)
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Price per Item (UGX):</label>
            <input
              type="number"
              value={inventoryItem.priceBought}
              onChange={(e) => setInventoryItem({
                ...inventoryItem,
                priceBought: Number(e.target.value)
              })}
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
        <p>Loading inventory item data...</p>
      )}
    </div>
  );
};

export default EditInventory;