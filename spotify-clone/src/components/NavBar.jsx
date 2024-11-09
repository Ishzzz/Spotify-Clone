import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(false);

    // Toggle the visibility of the dropdown
    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    // Handle logout (you can add your logout logic here)
    const handleLogout = () => {
        console.log("Logged out");
        // Add your logout functionality here, e.g., clearing authentication tokens, redirecting to login page, etc.
        navigate('/logout');  // Redirect to login page after logging out
    };

    return (
        <>
            <div className='w-full flex justify-between items-center font-semibold'>
                <div className='flex items-center gap-2'>
                    <img onClick={() => navigate(-1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_left} alt=""/>
                    <img onClick={() => navigate(1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_right} alt=""/>
                </div>
                <div className='relative'>  {/* Make this div relative to position the dropdown */}
                    <div className='flex items-center gap-4'>
                        <p className='bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer'>
                            <a href='https://www.spotify.com/in-en/premium/?ref=spotifycom_header_premium_individual'>Explore Premium</a>
                        </p>
                        <p className='bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer'>
                            <a href="https://www.spotify.com/us/download/windows/">Install App</a>
                        </p>
                        {/* Profile Icon */}
                        <p onClick={toggleDropdown} className='bg-purple-500 text-black w-8 h-8 rounded-full flex items-center justify-center cursor-pointer'>
                            I
                        </p>
                    </div>

                    {/* Dropdown Menu */}
                    {dropdownVisible && (
                        <div className='absolute right-0 mt-2 w-48 bg-gray-900 text-white rounded-lg shadow-lg z-10'>
                            <ul>
                                <li className='px-4 py-2 hover:bg-gray-700 cursor-pointer' onClick={handleLogout}>
                                    Log out
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <p className='bg-white text-black px-4 py-1 rounded-2xl cursor-pointer'>All</p>
                <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>Music</p>
                <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>Podcasts</p>
            </div>
        </>
    );
};

export default NavBar;
