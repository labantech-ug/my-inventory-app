import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Expense {
  id: number;
  category: string;
  amount: number;
  date: string;
  description: string;
}

const ManageExpenses: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState<Expense>({ id: 0, category: '', amount: 0, date: '', description: '' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/expenses');
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
        setError('Error fetching expenses');
      }
    };

    fetchExpenses();
  }, []);

  const handleAddExpense = async () => {
    try {
      const response = await axios.post('http://localhost:5000/expenses', newExpense);
      setExpenses([...expenses, response.data]);
      setNewExpense({ id: 0, category: '', amount: 0, date: '', description: '' });
    } catch (error) {
      console.error('Error adding expense:', error);
      setError('Error adding expense');
    }
  };

  const handleDeleteExpense = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/expenses/${id}`);
      setExpenses(expenses.filter(expense => expense.id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
      setError('Error deleting expense');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Expenses</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4 mb-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Category:</label>
          <input
            type="text"
            value={newExpense.category}
            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Amount (UGX):</label>
          <input
            type="number"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Date:</label>
          <input
            type="date"
            value={newExpense.date}
            onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Description:</label>
          <input
            type="text"
            value={newExpense.description}
            onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
          />
        </div>
        <button
          onClick={handleAddExpense}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Expense
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (UGX)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {expenses.map(expense => (
            <tr key={expense.id}>
              <td className="px-6 py-4 whitespace-nowrap">{expense.category}</td>
              <td className="px-6 py-4 whitespace-nowrap">{expense.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap">{expense.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">{expense.description}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleDeleteExpense(expense.id)}
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

export default ManageExpenses;