import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Infrastructure from './pages/Infrastructure';
import Agronomy from './pages/Agronomy';
import Security from './pages/Security';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="infrastructure" element={<Infrastructure />} />
        <Route path="agronomy" element={<Agronomy />} />
        <Route path="security" element={<Security />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
