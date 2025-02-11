import React, { useState } from 'react';

interface Order {
  id: number;
  customerName: string;
  itemName: string;
  quantity: number;
  totalPrice: number;
  date: string;
  status: string;
}

const ManageOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    // Example data
    { id: 1, customerName: 'John Doe', itemName: 'Item A', quantity: 2, totalPrice: 200000, date: '2025-01-15', status: 'Pending' },
    { id: 2, customerName: 'Jane Smith', itemName: 'Item B', quantity: 1, totalPrice: 50000, date: '2025-01-16', status: 'Completed' },
  ]);

  const handleEditOrder = (id: number) => {
    // Logic to edit order
    console.log(`Edit order with ID: ${id}`);
  };

  const handleDeleteOrder = (id: number) => {
    // Logic to delete order
    setOrders(orders.filter(order => order.id !== id));
  };

  const handleUpdateStatus = (id: number, status: string) => {
    setOrders(
      orders.map(order => (order.id === id ? { ...order, status } : order))
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Orders</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price (UGX)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map(order => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap">{order.customerName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.itemName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.totalPrice}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={order.status}
                  onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleEditOrder(order.id)}
                  className="text-blue-600 hover:text-blue-900 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteOrder(order.id)}
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

export default ManageOrders;