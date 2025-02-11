import React, { useState } from 'react';

interface Revenue {
  id: number;
  description: string;
  amount: number;
  date: string;
}

interface Expense {
  id: number;
  description: string;
  amount: number;
  date: string;
}

const ProfitLossStatement: React.FC = () => {
  const [revenues] = useState<Revenue[]>([
    // Example data
    { id: 1, description: 'Sales', amount: 500000, date: '2025-01-15' },
    { id: 2, description: 'Service Income', amount: 200000, date: '2025-01-16' },
  ]);
  const [expenses] = useState<Expense[]>([
    // Example data
    { id: 1, description: 'Rent', amount: 150000, date: '2025-01-15' },
    { id: 2, description: 'Utilities', amount: 50000, date: '2025-01-16' },
  ]);

  const totalRevenue = revenues.reduce((total, revenue) => total + revenue.amount, 0);
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const netProfitLoss = totalRevenue - totalExpenses;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Profit and Loss Statement</h2>
      <h3 className="text-xl font-semibold mb-2">Revenues</h3>
      <table className="min-w-full divide-y divide-gray-200 mb-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (UGX)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {revenues.map(revenue => (
            <tr key={revenue.id}>
              <td className="px-6 py-4 whitespace-nowrap">{revenue.description}</td>
              <td className="px-6 py-4 whitespace-nowrap">{revenue.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap">{revenue.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="text-xl font-semibold mb-2">Expenses</h3>
      <table className="min-w-full divide-y divide-gray-200 mb-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (UGX)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {expenses.map(expense => (
            <tr key={expense.id}>
              <td className="px-6 py-4 whitespace-nowrap">{expense.description}</td>
              <td className="px-6 py-4 whitespace-nowrap">{expense.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap">{expense.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="text-xl font-semibold mb-2">Summary</h3>
      <p className="mb-1">Total Revenue: UGX {totalRevenue}</p>
      <p className="mb-1">Total Expenses: UGX {totalExpenses}</p>
      <p className="mb-4">Net Profit/Loss: UGX {netProfitLoss}</p>
    </div>
  );
};

export default ProfitLossStatement;