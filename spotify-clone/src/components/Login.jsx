import React, { useState } from 'react';
import { assets } from '../assets/assets';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center min-h-screen bg-black">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-white text-center">Log In</h2>

                {/* Email or Username */}
                <div className="space-y-1">
                    <label htmlFor="username" className="text-sm font-medium text-white">
                        Email or username
                    </label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Email or username"
                        className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                </div>

                {/* Password */}
                <div className="space-y-1 relative">
                    <label htmlFor="password" className="text-sm font-medium text-white">
                        Password
                    </label>
                    <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    {/* Toggle Password Visibility */}
                    <button
                        type="button"
                        className="absolute inset-y-0 right-3 top-8 flex items-center text-gray-500 w-7 h-7"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? (
                            <img src={assets.slashed_eye} />
                        ) : (
                            <img src={assets.open_eye} />
                        )}
                    </button>
                </div>

                {/* Login Button */}
                <div className="mt-6">
                    <button onClick={()=>navigate('/')} className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700">
                        Log In
                    </button>
                </div>

                {/* Sign up or Forgot Password */}
                <div className="flex justify-center mt-4">
                    <p className="text-sm text-white">
                        Don't have an account?{' '}
                        <a href="/signup" className="text-white font-semibold hover:underline">
                            Sign up for Spotifyyy
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
