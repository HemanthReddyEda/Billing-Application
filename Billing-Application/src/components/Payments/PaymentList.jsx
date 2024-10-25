import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PaymentForm from './PaymentForm';

const PaymentList = ({ invoiceId }) => {
  const [payments, setPayments] = useState([]);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(invoiceId);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/payments/invoice/${selectedInvoiceId}`);
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, [selectedInvoiceId]);

  const handleRefresh = () => {
    // Refresh the payment list
    const fetchPayments = async () => {
      const response = await axios.get(`http://localhost:8080/api/payments/invoice/${selectedInvoiceId}`);
      setPayments(response.data);
    };
    fetchPayments();
  };

  return (
    <div>
      <h2>Payment List for Invoice #{selectedInvoiceId}</h2>
      <ul>
        {payments.map((payment) => (
          <li key={payment.id}>
            Amount: ${payment.amount} - Date: {new Date(payment.paymentDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
      <PaymentForm invoiceId={selectedInvoiceId} onSubmit={handleRefresh} />
    </div>
  );
};

export default PaymentList;
