import React, { useState } from 'react';
import axios from 'axios';

const InvoiceForm = ({ invoice = {}, onSubmit }) => {
  const [products, setProducts] = useState(invoice.products || []); // Ensure products is initialized as an array

  const handleAddProduct = () => {
    setProducts([...products, { productId: '', productName: '', quantity: 0, price: 0 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { products }; // Assuming you want to send the products array

    try {
      if (invoice.id) {
        await axios.put(`/api/invoices/${invoice.id}`, data);
      } else {
        await axios.post('/api/invoices', data);
      }
      onSubmit(); // Call the parent component's refresh function
    } catch (error) {
      console.error('Error saving invoice:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {products.map((product, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Product ID"
            value={product.productId}
            onChange={(e) => {
              const newProducts = [...products];
              newProducts[index].productId = e.target.value;
              setProducts(newProducts);
            }}
            required
          />
          <input
            type="text"
            placeholder="Product Name"
            value={product.productName}
            onChange={(e) => {
              const newProducts = [...products];
              newProducts[index].productName = e.target.value;
              setProducts(newProducts);
            }}
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={product.quantity}
            onChange={(e) => {
              const newProducts = [...products];
              newProducts[index].quantity = e.target.value;
              setProducts(newProducts);
            }}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={product.price}
            onChange={(e) => {
              const newProducts = [...products];
              newProducts[index].price = e.target.value;
              setProducts(newProducts);
            }}
            required
          />
        </div>
      ))}
      <button type="button" onClick={handleAddProduct}>Add Product</button>
      <button type="submit">{invoice.id ? 'Update' : 'Add'} Invoice</button>
    </form>
  );
};

export default InvoiceForm;
