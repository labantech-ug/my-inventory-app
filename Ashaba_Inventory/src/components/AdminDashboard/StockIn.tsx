import React, { useState } from 'react';
import axios from 'axios';

const StockIn: React.FC = () => {
  const [itemName, setItemName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>();
  const [priceBought, setPriceBought] = useState<number>();
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleAddStock = async () => {
    if (!itemName || !quantity || !priceBought) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/inventory/add', {
        itemName,
        quantity,
        priceBought
      });

      if (response.status === 200) {
        setSuccessMessage('Stock added successfully!');
        setItemName('');
        setQuantity(undefined);
        setPriceBought(undefined);
      }
    } catch (error) {
      console.error('Error adding stock:', error);
      alert('Error adding stock');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Stock In</h2>
      <form className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Item Name:</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Price Bought:</label>
          <input
            type="number"
            value={priceBought}
            onChange={(e) => setPriceBought(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
          />
        </div>
        <div>
          <button
            type="button"
            onClick={handleAddStock}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Add Stock/Item
          </button>
        </div>
        {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
      </form>
    </div>
  );
};

export default StockIn;