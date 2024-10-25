import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CustomerList from './components/Customers/CustomerList';
import ProductList from './components/Products/ProductList';
import InvoiceList from './components/Invoices/InvoiceList';
import PaymentList from './components/Payments/PaymentList';
import Reports from './components/Reports/Reports';
import CustomerForm from './components/Customers/CustomerForm';
import ProductForm from './components/Products/ProductForm';
import OrderForm from './components/Orders/OrderForm'; // Import the OrderForm component
import Dashboard from './components/Dashboards/Dashboard';

import CustomerDashboard from './components/Dashboards/CustomerDashboard';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Route for the customer dashboard */}
          <Route path="/customerdashboard" element={<CustomerDashboard />} /> {/* Route for the customer dashboard */}
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/add" element={<CustomerForm />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/add" element={<ProductForm />} />
          <Route path="/invoices" element={<InvoiceList />} />
          <Route path="/payments" element={<PaymentList />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/orders/add" element={<OrderForm />} /> {/* Route for adding an order */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
