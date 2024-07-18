import React, { useEffect, useState } from 'react';

const CustomerTable = ({ customers, transactions, onDisplayGraph }) => {
  const [searchKey, setSearchKey] = useState('');
  const [filterByTransactionAmount, setFilterByTransactionAmount] = useState(false);
  const [amountFilterMin, setAmountFilterMin] = useState(0);
  const [amountFilterMax, setAmountFilterMax] = useState(Infinity);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const filteredCustomers = customers.filter((customer) =>
      customer.name.toLowerCase().includes(searchKey.toLowerCase())
    );

    const filteredTransactions = filteredCustomers.flatMap((customer) =>
      transactions
        .filter((transaction) => transaction.customer_id == customer.id)
        .filter((transaction) => {
          if (filterByTransactionAmount) {
            const amount = parseFloat(transaction.amount);
            const min = parseFloat(amountFilterMin);
            const max = parseFloat(amountFilterMax);
            return amount >= min && amount <= max;
          }
          return true;
        })
        .map((transaction) => ({
          customerName: customer.name,
          transactionDate: transaction.date,
          transactionAmount: transaction.amount.toFixed(2),
          customerId: customer.id
        }))
    );

    setFilteredTransactions(filteredTransactions);
  }, [customers, transactions, searchKey, filterByTransactionAmount, amountFilterMin, amountFilterMax]);

  const handleMinAmountChange = (e) => {
    setAmountFilterMin(parseFloat(e.target.value));
  };

  const handleMaxAmountChange = (e) => {
    const maxValue = e.target.value === '' ? Infinity : parseFloat(e.target.value);
    setAmountFilterMax(maxValue);
  };

  const clearAmountFilters = () => {
    setAmountFilterMin(0);
    setAmountFilterMax(Infinity);
  };

  const handleSearchKeyChange = (e) => {
    setSearchKey(e.target.value);
  };

  const toggleFilterByTransactionAmount = () => {
    setFilterByTransactionAmount(!filterByTransactionAmount);
  };

  return (
    <div className="table-responsive">
      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-3"
          placeholder={`Search by customer name`}
          value={searchKey}
          onChange={handleSearchKeyChange}
        />
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="filterByAmount"
            checked={filterByTransactionAmount}
            onChange={toggleFilterByTransactionAmount}
          />
          <label className="form-check-label" htmlFor="filterByAmount">
            Filter by Transaction Amount
          </label>
          {filterByTransactionAmount && (
            <div className="d-flex mt-3">
              <label htmlFor="amountFilterMin" className="me-2">Min Amount:</label>
              <input
                type="number"
                className="form-control me-2"
                id="amountFilterMin"
                placeholder="Min Amount"
                value={amountFilterMin}
                onChange={handleMinAmountChange}
              />
              <label htmlFor="amountFilterMax" className="me-2">Max Amount:</label>
              <input
                type="number"
                className="form-control me-2"
                id="amountFilterMax"
                placeholder="Infinity"
                value={amountFilterMax === Infinity ? '' : amountFilterMax}
                onChange={handleMaxAmountChange}
              />
              <button
                className="btn btn-outline-secondary"
                onClick={clearAmountFilters}
              >
                Clear
              </button>
            </div>
          )}
        </div>
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
