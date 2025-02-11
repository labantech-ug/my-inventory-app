import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toWords } from 'number-to-words';

interface Sale {
  id: number;
  itemName: string;
  quantity: number;
  priceBought: number;
  priceSold: number;
  remainingStock: number;
}

const ProfitsLosses: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [totalProfit, setTotalProfit] = useState<number>(0);
  const [totalLoss, setTotalLoss] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfitsLosses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/sales/profits-losses');
        // Ensure backend is sending data correctly
        console.log('Response:', response.data);
        setSales(response.data.sales);
        setTotalProfit(response.data.totalProfit);
        setTotalLoss(response.data.totalLoss);
      } catch (error) {
        console.error('Error fetching profits and losses:', error);
        if (axios.isAxiosError(error)) {
          setError('Axios Error: ' + error.message);
        } else {
          setError('Unexpected error occurred');
        }
      }
    };

    fetchProfitsLosses();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Profits and Losses</h2>
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity Sold</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Sold (UGX)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining Stock</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sales.map(sale => (
            <tr key={sale.id}>
              <td className="px-6 py-4 whitespace-nowrap">{sale.itemName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{sale.quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap">{sale.priceSold}</td>
              <td className="px-6 py-4 whitespace-nowrap">{sale.remainingStock}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4">Total Profit: UGX {totalProfit}</p>
      <p>Total Loss: UGX {totalLoss}</p>
      <p>Total Profit in Words: {toWords(totalProfit)} Shillings</p>
      <p>Total Loss in Words: {toWords(totalLoss)} Shillings</p>
    </div>
  );
};

export default ProfitsLosses;