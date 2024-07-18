import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerTable from "./components/CustomerTable";
import TransactionGraph from "./components/TransactionGraph";

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [filterBy, setFilterBy] = useState('name'); // Default filter by customer name

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersResult = await axios("http://localhost:5000/customers");
        const transactionsResult = await axios(
          "http://localhost:5000/transactions"
        );

        setCustomers(customersResult.data);
        setTransactions(transactionsResult.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDisplayGraph = (customerId) => {
    setSelectedCustomerId(customerId);
  };

  const closeModal = () => {
    setSelectedCustomerId(null);
  };

  const onFilterChange = (selectedFilter) => {
    setFilterBy(selectedFilter);
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-12">
          <div className="mb-3">
            <input
              type="text"
              className="form-control mb-3"
              placeholder={`Filter by ${filterBy === 'name' ? 'customer name' : 'transaction amount'}`}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
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
          <CustomerTable
            customers={customers}
            transactions={transactions}
            filter={filter}
            filterBy={filterBy}
            onDisplayGraph={handleDisplayGraph}
          />
        </div>
        {selectedCustomerId && (
          <div className="modal d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-fullscreen" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title pe-2">Customer Transactions Graph</h5>
                  <button type="button" className="btn btn-danger close" onClick={closeModal}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body top-0 bottom-0 start-0 end-0">
                  <TransactionGraph
                    transactions={transactions}
                    customerId={selectedCustomerId}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
