import React, { useEffect } from 'react';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const TransactionGraph = ({ transactions, customerId }) => {
//   console.log('Transactions in TransactionGraph:', transactions);
//   console.log('CustomerId in TransactionGraph:', customerId);

  const customerTransactions = transactions.filter(
    (transaction) => transaction.customer_id == customerId
  );

//   console.log('customerTransactions', customerTransactions)

  const lineLabels = customerTransactions.map((transaction) => transaction.date);
//   console.log ('lineLabels', lineLabels);
  const lineData = customerTransactions.map((transaction) => transaction.amount);
//   console.log ('lineData', lineData);

  const data = {
    labels: lineLabels,
    datasets: [
      {
        label: 'Transaction Amount',
        data: lineData,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
    ]
  };

  return <Line data={data} />;
};

export default TransactionGraph;
