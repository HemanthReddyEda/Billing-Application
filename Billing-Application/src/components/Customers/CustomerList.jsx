import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div>
      <h2>Customer List</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>{customer.name} - {customer.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
