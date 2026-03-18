import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Interview from './pages/Interview';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import Analytics from './pages/Analytics';

function App() {
  return (
    <BrowserRouter>
      {/* Global Background Glows */}
      <div className="bg-glow glow-blue animate-float" style={{ top: '-10%', left: '-5%', width: '40vw', height: '40vw' }}></div>
      <div className="bg-glow glow-purple" style={{ bottom: '-10%', right: '-5%', width: '40vw', height: '40vw', animation: 'float 8s ease-in-out infinite reverse' }}></div>
      <div className="bg-glow glow-pink" style={{ top: '40%', right: '20%', width: '20vw', height: '20vw', animation: 'pulse-glow 4s ease-in-out infinite' }}></div>
      
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="interview" element={<Interview />} />
          <Route path="resume" element={<ResumeAnalyzer />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
