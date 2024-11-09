import React from 'react';

const WelcomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-[70.4vh]">
      <div className="text-center">
        <p className="text-6xl font-extrabold ">
          Welcome To <span className="text-[#1db954]">Spotify</span> Admin Panel
        </p>
        <p className="mt-4 text-lg text-gray-800">
          Manage your Songs, Albums, and more with ease.
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
