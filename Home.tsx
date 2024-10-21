import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, MessageSquare, Stethoscope } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to SkinCare AI</h1>
      <p className="text-xl mb-8">Your personal skin health assistant powered by artificial intelligence.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          to="/skin-disease-detection"
          icon={<Camera className="w-12 h-12 mb-4 text-blue-500" />}
          title="Skin Disease Detection"
          description="Upload a photo and get instant analysis of potential skin conditions."
        />
        <FeatureCard
          to="/doctor-consult"
          icon={<Stethoscope className="w-12 h-12 mb-4 text-green-500" />}
          title="Doctor Consultation"
          description="Connect with dermatologists for professional advice and treatment plans."
        />
        <FeatureCard
          to="/feedback"
          icon={<MessageSquare className="w-12 h-12 mb-4 text-purple-500" />}
          title="Feedback"
          description="Share your experience and help us improve our services."
        />
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ to: string; icon: React.ReactNode; title: string; description: string }> = ({ to, icon, title, description }) => (
  <Link to={to} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
    {icon}
    <h2 className="text-2xl font-semibold mb-2">{title}</h2>
    <p className="text-gray-600">{description}</p>
  </Link>
);

export default Home;