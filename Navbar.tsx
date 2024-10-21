import React from 'react';
import { Link } from 'react-router-dom';
import { Home, LogIn, MessageSquare, Stethoscope, Camera } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">SkinCare AI</Link>
        <div className="space-x-4">
          <NavLink to="/" icon={<Home className="w-5 h-5" />} text="Home" />
          <NavLink to="/login" icon={<LogIn className="w-5 h-5" />} text="Login" />
          <NavLink to="/feedback" icon={<MessageSquare className="w-5 h-5" />} text="Feedback" />
          <NavLink to="/doctor-consult" icon={<Stethoscope className="w-5 h-5" />} text="Doctor Consult" />
          <NavLink to="/skin-disease-detection" icon={<Camera className="w-5 h-5" />} text="Skin Detection" />
        </div>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{ to: string; icon: React.ReactNode; text: string }> = ({ to, icon, text }) => (
  <Link to={to} className="flex items-center hover:text-blue-200 transition duration-300">
    {icon}
    <span className="ml-1">{text}</span>
  </Link>
);

export default Navbar;