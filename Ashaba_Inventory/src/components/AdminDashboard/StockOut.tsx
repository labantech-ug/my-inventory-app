import React, { useState } from 'react';
import axios from 'axios';

const StockOut: React.FC = () => {
  const [itemName, setItemName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>();
  const [priceSold, setPriceSold] = useState<number>();
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleSellStock = async () => {
    if (!itemName || !quantity || !priceSold) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/inventory/sell', {
        itemName,
        quantity,
        priceSold
      });

      if (response.status === 200) {
        setSuccessMessage('Stock sold successfully!');
        setItemName('');
        setQuantity(0);
        setPriceSold(0);
      }
    } catch (error) {
      console.error('Error selling stock:', error);
      alert('Error selling stock');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Stock Out</h2>
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
          <label className="block font-medium text-gray-700">Price Sold:</label>
          <input
            type="number"
            value={priceSold}
            onChange={(e) => setPriceSold(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
          />
        </div>
        <div>
          <button
            type="button"
            onClick={handleSellStock}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Sell Stock
          </button>
        </div>
        {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
      </form>
    </div>
  );
};

export default StockOut;