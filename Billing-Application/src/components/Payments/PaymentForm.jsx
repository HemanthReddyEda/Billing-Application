import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = ({ invoiceId, onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { amount, paymentDate };

    try {
      await axios.post(`/api/payments`, { invoiceId, ...data });
      onSubmit(); // Call the parent component's refresh function
    } catch (error) {
      console.error('Error recording payment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Payment Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="date"
        value={paymentDate}
        onChange={(e) => setPaymentDate(e.target.value)}
        required
      />
      <button type="submit">Record Payment</button>
    </form>
  );
};

export default PaymentForm;
