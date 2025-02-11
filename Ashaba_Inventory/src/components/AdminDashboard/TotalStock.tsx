import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface StockItem {
  id: number;
  itemName: string;
  quantity: number;
}

const TotalStock: React.FC = () => {
  const [stock, setStock] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await axios.get('http://localhost:5000/inventory/total');
        setStock(response.data);
      } catch (error) {
        console.error('Error fetching stock:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Total Stock</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {stock.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.itemName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TotalStock;