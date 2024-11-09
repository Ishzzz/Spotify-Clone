import React from 'react';
import { useNavigate } from 'react-router-dom';


const Logout = () => {

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">You Have Successfully Logged Out</h1>
        <p className="text-lg text-gray-400">Thank you for using our service. We hope to see you again soon!</p>
        <button onClick={()=>navigate('/login')} className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-800 transition">
          Login Again
        </button>
      </div>
    </div>
  );
};

export default Logout;
