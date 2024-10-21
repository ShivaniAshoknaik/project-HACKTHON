import React, { useState } from 'react';
import { Calendar, Clock, Send } from 'lucide-react';

const DoctorConsult: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement consultation booking logic
    console.log('Consultation booked:', { name, email, date, time, reason });
    // Reset form
    setName('');
    setEmail('');
    setDate('');
    setTime('');
    setReason('');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Book a Doctor Consultation</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Preferred Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 text-gray-400" />
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div className="w-1/2">
            <label htmlFor="time" className="block text-gray-700 font-bold mb-2">Preferred Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="reason" className="block text-gray-700 font-bold mb-2">Reason for Consultation</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
        >
          <Send className="w-5 h-5 mr-2" />
          Book Consultation
        </button>
      </form>
    </div>
  );
};

export default DoctorConsult;