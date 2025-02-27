import React from "react";
import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Clients from "./pages/Clients";
import Inventory from "./pages/Inventory";
import Products from "./pages/Products";
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import Sale from "./pages/Sale";
import Purchase from "./pages/Purchase";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';



const App = () => {
  return (
    <div className="app-container">
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/products" element={<Products />} />
        <Route path="/employees" element={<Employee />} />
        <Route path="/sales" element={<Sale />} />
        <Route path="/purchases" element={<Purchase />} />
      </Routes>
    </div>
  );
};

export default App;
