// src/components/CustomerTable.jsx
import React from 'react';

const CustomerTable = ({ customers, transactions, filter, onCustomerSelect }) => {
  // console.log('Customers in CustomerTable:', customers);
  // console.log('Transactions in CustomerTable:', transactions);
  
  const filteredCustomers = customers.filter((customer) => 
  customer.name.toLowerCase().includes(filter.toLowerCase())
);

  return (
    <table>
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Transaction Date</th>
          <th>Transaction Amount</th>
        </tr>
      </thead>
      <tbody>
        {filteredCustomers.map((customer) => (
          transactions
            .filter((transaction) => {
              // console.log("transaction.customer_id", transaction.customer_id);
              // console.log("customer.id", customer.id);
              return transaction.customer_id == customer.id
            })
            .map((transaction) => (
              <tr key={transaction.id} onClick={() => onCustomerSelect(customer.id)}>
                <td>{customer.name}</td>
                <td>{transaction.date}</td>
                <td>{transaction.amount}</td>
              </tr>
            ))
        ))}
      </tbody>
    </table>
  );
};

export default CustomerTable;
