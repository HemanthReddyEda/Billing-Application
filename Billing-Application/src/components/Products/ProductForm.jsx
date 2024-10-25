import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = ({ products = [], onSubmit }) => {
  const [productList, setProductList] = useState(products.length ? products : [{ productId: '', name: '', description: '', price: '', quantity: '', imageUrl: '' }]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...productList];
    updatedProducts[index][name] = value;
    setProductList(updatedProducts);
  };

  const handleAddProduct = () => {
    setProductList([...productList, { productId: '', name: '', description: '', price: '', quantity: '', imageUrl: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requests = productList.map(product => {
        const data = { 
          productId: product.productId,
          name: product.name, 
          description: product.description,
          price: product.price, 
          quantity: product.quantity,
          imageUrl: product.imageUrl // Include imageUrl in the data
        };

        if (product.id) {
          return axios.put(`http://localhost:8080/api/products/${product.id}`, data);
        } else {
          return axios.post('http://localhost:8080/api/products', data);
        }
      });

      await Promise.all(requests); // Send all requests concurrently
      onSubmit(); // Call the parent component's refresh function
    } catch (error) {
      console.error('Error saving products:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {productList.map((product, index) => (
        <div key={index}>
          <input
            type="text"
            name="productId"
            placeholder="Product ID"
            value={product.productId}
            onChange={(e) => handleChange(index, e)}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={(e) => handleChange(index, e)}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Product Description"
            value={product.description}
            onChange={(e) => handleChange(index, e)}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Product Price"
            value={product.price}
            onChange={(e) => handleChange(index, e)}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={product.quantity}
            onChange={(e) => handleChange(index, e)}
            required
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={product.imageUrl}
            onChange={(e) => handleChange(index, e)}
            required
          />
        </div>
      ))}
      <button type="button" onClick={handleAddProduct}>
        Add Another Product
      </button>
      <button type="submit">Submit Products</button>
    </form>
  );
};

export default ProductForm;
