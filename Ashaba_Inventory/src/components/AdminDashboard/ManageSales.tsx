import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Sale {
  id: number;
  itemName: string;
  quantity: number;
  priceSold: number;
}

const ManageSales: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get('http://localhost:5000/sales');
        setSales(response.data);
      } catch (error) {
        console.error('Error fetching sales:', error);
        setError('Error fetching sales');
      }
    };
    fetchSales();
  }, []);

  const handleEditSale = (id: number) => {
    try {
      // Redirect to sale page with sale details pre-filled
      navigate(`/sale/edit/${id}`);
    } catch (error) {
      console.error('Error navigating to edit sale:', error);
      setError('Error navigating to edit sale');
    }
  };

  const handleDeleteSale = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/sales/${id}`);
      setSales(sales.filter(sale => sale.id !== id));
    } catch (error) {
      console.error('Error deleting sale:', error);
      setError('Error deleting sale');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Sales</h2>
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity Sold</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Sold (UGX)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price (UGX)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sales.map(sale => (
            <tr key={sale.id}>
              <td className="px-6 py-4 whitespace-nowrap">{sale.itemName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{sale.quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap">{sale.priceSold}</td>
              <td className="px-6 py-4 whitespace-nowrap">{sale.quantity * sale.priceSold}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleEditSale(sale.id)}
                  className="text-blue-600 hover:text-blue-900 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteSale(sale.id)}
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

export default ManageSales;