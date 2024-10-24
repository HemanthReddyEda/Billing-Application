import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get('/api/products');
        const ordersResponse = await axios.get('/api/orders');
        
        setProducts(productsResponse.data);
        setOrders(Array.isArray(ordersResponse.data) ? ordersResponse.data : []); // Ensure orders is an array
      } catch (error) {
        console.error('Error fetching data:', error);
        // You might want to set orders to an empty array or handle the error accordingly
        setOrders([]);
      }
    };

    fetchData();
  }, []);

  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0); // Ensure totalAmount is handled

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <h3>Statistics</h3>
        <p>Total Products: {totalProducts}</p>
        <p>Total Orders: {totalOrders}</p>
        <p>Total Revenue: ${totalRevenue.toFixed(2)}</p>
      </div>
      <div>
        <h3>Recent Orders</h3>
        <ul>
          {orders.slice(0, 5).map((order) => (
            <li key={order.id}>
              Order ID: {order.id}, Total Amount: ${order.totalAmount}, Date: {new Date(order.createdAt).toLocaleDateString()} {/* Adjust date format as needed */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
