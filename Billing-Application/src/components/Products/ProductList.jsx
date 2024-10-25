import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderForm from '../Orders/OrderForm'; // Ensure this path matches your file structure

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // State to hold the selected product for ordering

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleOrder = (product) => {
    setSelectedProduct(product); // Set the selected product for ordering
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.imageUrl && <img src={product.imageUrl} alt={product.name} style={{ width: '100px', height: '100px' }} />} {/* Display product image */}
            <p>{product.name} - ${product.price}</p>
            <button onClick={() => handleOrder(product)}>Order</button> {/* Button to order the product */}
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

export default ProductList;
