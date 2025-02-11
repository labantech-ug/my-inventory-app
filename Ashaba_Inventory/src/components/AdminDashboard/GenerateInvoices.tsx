import React, { useState, useRef } from 'react';

interface Order {
  id: number;
  customerName: string;
  itemName: string;
  quantity: number;
  totalPrice: number;
  date: string;
}

const GenerateInvoices: React.FC = () => {
  const [orders] = useState<Order[]>([
    // Example data
    { id: 1, customerName: 'John Doe', itemName: 'Item A', quantity: 2, totalPrice: 200000, date: '2025-01-15' },
    { id: 2, customerName: 'Jane Smith', itemName: 'Item B', quantity: 1, totalPrice: 50000, date: '2025-01-16' },
  ]);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleGenerateInvoice = (id: number) => {
    setSelectedOrderId(id);
    // Logic to generate invoice
    console.log(`Generating invoice for order ID: ${id}`);
  };

  const handlePrintInvoice = () => {
    if (invoiceRef.current) {
      const printContents = invoiceRef.current.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  const selectedOrder = orders.find(order => order.id === selectedOrderId);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Generate Invoices</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price (UGX)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
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
                <button
                  onClick={() => handleGenerateInvoice(order.id)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  Generate Invoice
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedOrder && (
        <div ref={invoiceRef} className="mt-6 p-4 border rounded-md">
          <h3 className="text-xl font-semibold mb-2">Invoice</h3>
          <p><span className="font-medium">Customer Name:</span> {selectedOrder.customerName}</p>
          <p><span className="font-medium">Item Name:</span> {selectedOrder.itemName}</p>
          <p><span className="font-medium">Quantity:</span> {selectedOrder.quantity}</p>
          <p><span className="font-medium">Total Price (UGX):</span> {selectedOrder.totalPrice}</p>
          <p><span className="font-medium">Date:</span> {selectedOrder.date}</p>
          <button
            onClick={handlePrintInvoice}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Print Invoice
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerateInvoices;