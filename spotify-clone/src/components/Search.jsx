import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { PlayerContext } from '../context/PlayerContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState({
        songs: [],
        albums: []
    });

    const navigate = useNavigate();

    // Use PlayerContext to access play functions
    const { playWithId } = useContext(PlayerContext);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchQuery.trim() === '') return; // Skip if query is empty

            try {
                const response = await axios.get(`http://localhost:4000/api/song/search?q=${searchQuery}`);
                setSearchResults(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        // Fetch search results when the search query changes (with a slight delay for optimization)
        const delayDebounceFn = setTimeout(() => {
            fetchSearchResults();
        }, 300);

        return () => clearTimeout(delayDebounceFn); // Cleanup on unmount
    }, [searchQuery]);

    const handlePlaySong = (songId) => {
        playWithId(songId);  // Play the song using the player's context
    };

    return (
        <>
            <div className="bg-black h-screen text-white p-8 ">
                {/* Navigation and Search Bar in the Same Row */}
                <div className="flex items-center gap-2 mb-8">
                    {/* Left and Right Navigation Arrows */}
                    <div className='flex items-center gap-2'>
                        <img onClick={() => navigate(-1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_left} alt="" />
                        <img onClick={() => navigate(1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_right} alt="" />
                    </div>

                    {/* Search Bar */}
                    <div className="flex items-center bg-gray-800 rounded-full px-4 py-3 w-full ml-10">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 111.5-1.5 7.5 7.5 0 01-1.5 1.5z"></path>
                        </svg>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="What do you want to play?"
                            className="bg-transparent w-full text-white placeholder-gray-400 pl-4 text-xl focus:outline-none"
                        />
                    </div>
                </div>

                {/* Display Search Results */}
                {searchQuery && (
                    <>
                        <h2 className="text-2xl mb-4">Search Results for "{searchQuery}"</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Songs Section */}
                            {searchResults.songs.length > 0 && (
                                <>
                                    <h3 className="text-lg font-bold col-span-full">Songs</h3>
                                    {searchResults.songs.map((song) => (
                                        <div
                                            key={song._id}
                                            className="bg-gray-800 rounded-lg p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-700 transition"
                                            onClick={() => handlePlaySong(song._id)} // Play song on click
                                        >
                                            <img src={song.image} alt={song.name} className="w-12 h-12 rounded-md" />
                                            <div>
                                                <p className="font-bold">{song.name}</p>
                                                <p className="text-sm text-gray-400">{song.artist}</p>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}

                            {/* Albums Section */}
                            {searchResults.albums.length > 0 && (
                                <>
                                    <h3 className="text-lg font-bold col-span-full">Albums</h3>
                                    {searchResults.albums.map((album) => (
                                        <div
                                            key={album._id}
                                            className="bg-gray-800 rounded-lg p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-700 transition"
                                            onClick={() => navigate(`/album/${album._id}`)} // Open album page on click
                                        >
                                            <img src={album.image} alt={album.name} className="w-12 h-12 rounded-md" />
                                            <div>
                                                <p className="font-bold">{album.name}</p>
                                                <p className="text-sm text-gray-400">{album.artist}</p>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}

                            {/* No results message */}
                            {searchResults.songs.length === 0 && searchResults.albums.length === 0 && (
                                <p className="text-gray-400 col-span-full">No results found</p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Search;
