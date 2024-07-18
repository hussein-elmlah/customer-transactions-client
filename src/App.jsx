// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerTable from './components/CustomerTable.jsx';
import TransactionGraph from './components/TransactionGraph.jsx';

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersResult = await axios('http://localhost:5000/customers');
        const transactionsResult = await axios('http://localhost:5000/transactions');

        // console.log('Fetched customers:', customersResult.data);
        // console.log('Fetched transactions:', transactionsResult.data);

        setCustomers(customersResult.data);
        setTransactions(transactionsResult.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by customer name or transaction amount"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <CustomerTable
        customers={customers}
        transactions={transactions}
        filter={filter}
        onCustomerSelect={(id) => setSelectedCustomerId(id)}
      />
      {selectedCustomerId && (
        <TransactionGraph transactions={transactions} customerId={selectedCustomerId} />
      )}
    </div>
  );
};

export default App;
