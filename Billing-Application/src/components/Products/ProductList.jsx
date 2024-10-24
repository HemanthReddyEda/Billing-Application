import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderForm from '../Orders/OrderForm'; // Ensure this path matches your file structure

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // State to hold the selected product for ordering

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleOrder = (product) => {
    console.log(product);
    setSelectedProduct(product); // Set the selected product for ordering
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
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
