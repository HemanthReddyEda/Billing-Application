import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentForm = ({ invoiceId, onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  // Set today's date as default payment date on mount
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setPaymentDate(today);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Amount must be a valid number greater than zero.');
      return;
    }

    setError('');
    const data = { amount: parsedAmount, paymentDate };
    setLoading(true); // Set loading state

    try {
      await axios.post(`http://localhost:8080/api/payments`, { invoiceId, ...data });
      setSuccess('Payment recorded successfully!');
      onSubmit(); // Call the parent component's refresh function
      // Reset form
      setAmount('');
      const today = new Date().toISOString().split('T')[0]; // Reset payment date to today
      setPaymentDate(today);
    } catch (error) {
      console.error('Error recording payment:', error);
      const errorMessage = error.response?.data?.message || 'Failed to record payment. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
      <div>
        <label htmlFor="amount">Payment Amount</label>
        <input
          type="number"
          id="amount"
          placeholder="Payment Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="0.01" // Minimum amount
          step="0.01" // Step for decimals
          pattern="^\d+(\.\d{1,2})?$" // Regex pattern to validate decimal numbers
        />
      </div>
      <div>
        <label htmlFor="paymentDate">Payment Date</label>
        <input
          type="date"
          id="paymentDate"
          value={paymentDate}
          onChange={(e) => setPaymentDate(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Recording...' : 'Record Payment'}
      </button>
    </form>
  );
};

export default PaymentForm;
