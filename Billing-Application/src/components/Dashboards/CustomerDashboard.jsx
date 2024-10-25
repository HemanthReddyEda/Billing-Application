import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderForm from '../Orders/OrderForm'; // Import your OrderForm component

const CustomerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Product to be ordered
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products');
        // Ensure response data is an array
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error('Expected an array of products, but got:', response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProducts();
  }, []);

  const handleOrder = (product) => {
    setSelectedProduct(product); // Set the selected product for ordering
  };

  if (loading) {
    return <div>Loading products...</div>; // Optional loading message
  }

  return (
    <div>
      <h2>Customer Dashboard</h2>
      <h3>Available Products</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price.toFixed(2)}
            <button onClick={() => handleOrder(product)}>Order</button>
          </li>
        ))}
      </ul>
      {selectedProduct && (
        <OrderForm 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} // Close the order form
        />
      )}
    </div>
  );
};

export default CustomerDashboard;
