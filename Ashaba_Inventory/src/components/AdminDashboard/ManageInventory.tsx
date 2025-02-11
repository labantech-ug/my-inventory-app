import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface InventoryItem {
  id: number;
  itemName: string;
  quantity: number;
  priceBought: number;
}

const ManageInventory: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/inventory');
        setInventory(response.data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
        setError('Error fetching inventory');
      }
    };
    fetchInventory();
  }, []);

  const handleEditInventoryItem = (id: number) => {
    // Redirect to inventory item page with details pre-filled
    navigate(`/inventory/edit/${id}`);
  };

  const handleDeleteInventoryItem = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/inventory/${id}`);
      setInventory(inventory.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting inventory item:', error);
      setError('Error deleting inventory item');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Inventory</h2>
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price per Item (UGX)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price (UGX)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {inventory.map(item => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.itemName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.priceBought}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.quantity * item.priceBought}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleEditInventoryItem(item.id)}
                  className="text-blue-600 hover:text-blue-900 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteInventoryItem(item.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageInventory;