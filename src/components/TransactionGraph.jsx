import React, { useEffect } from 'react';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const TransactionGraph = ({ transactions, customerId }) => {
  const customerTransactions = transactions.filter((transaction) => transaction.customer_id == customerId);

  // Aggregate transactions by date
  const aggregatedTransactions = customerTransactions.reduce((acc, transaction) => {
    const date = transaction.date;
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += transaction.amount;
    return acc;
  }, {});

  // Create an array of all dates between the earliest and latest transaction dates
  const allDates = customerTransactions.map(transaction => transaction.date);
  const startDate = new Date(Math.min(...allDates.map(date => new Date(date))));
  const endDate = new Date(Math.max(...allDates.map(date => new Date(date))));
  const dateIterator = new Date(startDate);
  const dateRange = [];
  while (dateIterator <= endDate) {
    dateRange.push(new Date(dateIterator).toISOString().slice(0,10));
    dateIterator.setDate(dateIterator.getDate() + 1);
  }

  // Fill in missing dates with zero amount
  const filledData = dateRange.map(date => ({
    date: date,
    amount: aggregatedTransactions[date] || 0
  }));

  filledData.sort((a, b) => new Date(a.date) - new Date(b.date));

  const lineLabels = filledData.map(entry => entry.date);
  const lineData = filledData.map(entry => entry.amount);

  // Data for the Line chart
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
