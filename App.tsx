import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import DoctorConsult from './pages/DoctorConsult';
import SkinDiseaseDetection from './pages/SkinDiseaseDetection';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/doctor-consult" element={<DoctorConsult />} />
            <Route path="/skin-disease-detection" element={<SkinDiseaseDetection />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;