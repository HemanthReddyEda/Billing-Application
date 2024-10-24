import React, { useState } from 'react';
import axios from 'axios';

const CustomerForm = ({ customer = {}, onSubmit }) => {
  const [name, setName] = useState(customer.name || '');
  const [email, setEmail] = useState(customer.email || '');
  const [mobile, setMobile] = useState(customer.mobile || ''); // New state for mobile number

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, mobile }; // Include mobile number in the data object

    try {
      if (customer.id) {
        await axios.put(`/api/customers/${customer.id}`, data);
      } else {
        await axios.post('/api/customers', data);
      }
      onSubmit(); // Call the parent component's refresh function
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Customer Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Customer Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="tel" // Set input type to 'tel' for mobile numbers
        placeholder="Customer Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        required
      />
      <button type="submit">{customer.id ? 'Update' : 'Add'} Customer</button>
    </form>
  );
};

export default CustomerForm;
