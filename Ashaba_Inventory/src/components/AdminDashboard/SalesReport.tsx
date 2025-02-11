import React, { useState } from 'react';
import axios from 'axios';

interface Sale {
  id: number;
  itemName: string;
  quantity: number;
  priceSold: number;
  date: string;
}

const SalesReport: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleFilter = async () => {
    try {
      const response = await axios.get('http://localhost:5000/sales', {
        params: {
          startDate,
          endDate,
        },
      });

      const filteredSales = response.data;
      setSales(filteredSales);
    } catch (error) {
      console.error('Error fetching sales data:', error);
      setError('Error fetching sales data');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Sales Report</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-2">
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-2">
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
          />
        </label>
      </div>
      <button
        onClick={handleFilter}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Filter
      </button>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity Sold</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Sold (UGX)</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td className="px-6 py-4 whitespace-nowrap">{sale.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">{sale.itemName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{sale.quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap">{sale.priceSold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesReport;