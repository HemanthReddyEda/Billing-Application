import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1); // Default quantity to 1
  const [error, setError] = useState(null); // For error handling
  const [success, setSuccess] = useState(false); // For success feedback

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if product is valid
    if (!product || !product.id) {
      setError("Product information is not available.");
      return;
    }

    const orderData = {
      productId: product.id,
      quantity: parseInt(quantity, 10), // Ensure quantity is an integer
    };

    try {
      await axios.post('/api/orders', orderData); // Send order data to the backend
      setSuccess(true);
      onClose(); // Close the order form on success
    } catch (error) {
      console.error('Error creating order:', error);
      setError("There was an issue creating the order.");
    }
  };

  // If product is not available, show a fallback message
  if (!product) {
    return <div>Product information is not available.</div>;
  }

  return (
    <div>
      <h2>Order {product.name}</h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Error message */}
        {success && <p style={{ color: 'green' }}>Order successfully placed!</p>} {/* Success message */}
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Order</button>
        <button type="button" onClick={onClose}>Cancel</button> {/* Close button */}
      </form>
    </div>
  );
};

export default OrderForm;
