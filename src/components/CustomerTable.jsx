import React, { useEffect, useState } from 'react';

const CustomerTable = ({ customers, transactions, filter, filterBy, onDisplayGraph }) => {
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // Filter customers and transactions when filter or filterBy changes
  useEffect(() => {
    console.log(" filterBy :", filterBy);
    console.log(" filter :", filter);

    const filteredCustomers = customers.filter((customer) =>{
      if ( filterBy === 'name') {
        return customer.name.toLowerCase().includes(filter.toLowerCase());
      }
      return true;
    }
    );

    const filteredTransactions = filteredCustomers.flatMap((customer) =>
      transactions
        .filter((transaction) => {
          console.log(" inside filterBy :", filterBy);
          console.log(" inside filter :", filter);
          return transaction.customer_id == customer.id
        })
        .filter((transaction) => {
          console.log ("transaction.amount.toString():", transaction.amount.toString());
          console.log(" inside filter :", filter);
          return ( filterBy === 'amount'
            ? (transaction.amount === Number(filter))
            : true
          )
        }
        )
        .map((transaction) => ({
          customerName: customer.name,
          transactionDate: transaction.date,
          transactionAmount: transaction.amount.toFixed(2),
          customerId: customer.id
        }))
    );

    setFilteredCustomers(filteredCustomers);
    setFilteredTransactions(filteredTransactions);
  }, [customers, transactions, filter, filterBy]);

  console.log('Filtered Customers:', filteredCustomers);
  console.log('Filtered Transactions:', filteredTransactions);

  return (
    <div className="table-responsive">
      <div className="mb-3">
        <label htmlFor="filterBy" className="form-label me-2">Filter by:</label>
        <select
          id="filterBy"
          className="form-select"
          value={filterBy}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="name">Customer Name</option>
          <option value="amount">Transaction Amount</option>
        </select>
      </div>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Customer Name</th>
            <th>Transaction Date</th>
            <th>Transaction Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction, index) => (
            <tr key={`key-${index}`}>
              <td>{transaction.customerName}</td>
              <td>{transaction.transactionDate}</td>
              <td>${transaction.transactionAmount}</td>
              <td className='text-center'>
                <button
                  className="btn btn-primary w-100"
                  onClick={() => onDisplayGraph(transaction.customerId)}
                >
                  Graph
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
