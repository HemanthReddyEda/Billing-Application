import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InvoiceForm from './InvoiceForm';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/invoices');
        setInvoices(response.data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    const fetchCustomers = async () => {
      try {
        const response = await axios.get('/api/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchInvoices();
    fetchCustomers();
    fetchProducts();
  }, []);

  const handleEdit = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleRefresh = async () => {
    setSelectedInvoice(null);
    // Refresh the invoice list
    try {
      const response = await axios.get('http://localhost:8080/api/invoices');
      setInvoices(response.data);
    } catch (error) {
      console.error('Error refreshing invoices:', error);
    }
  };

  return (
    <div>
      <h2>Invoice List</h2>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>
            Invoice #{invoice.id} - Total: ${invoice.total}
            <button onClick={() => handleEdit(invoice)}>Edit</button>
          </li>
        ))}
      </ul>
      {selectedInvoice && (
        <InvoiceForm 
          invoice={selectedInvoice} 
          onSubmit={handleRefresh} 
          customers={customers} 
          products={products} 
        />
      )}
    </div>
  );
};

export default InvoiceList;
