import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to check the current path
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Display from './components/Display';
import Logout from './components/Logout'; // Import the Login component
import { PlayerContext } from './context/PlayerContext';
import Login from './components/Login';

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);
  const location = useLocation(); // Hook to get the current URL path

  return (
    <div className='h-screen bg-black'>
      {/* Check if the current path is "/login" and render the Login component */}
      {location.pathname === '/logout' ? (
        <Logout />
      ) : (
        location.pathname ==='/login' ? (
          <Login />
        ) : (
          songsData.length !== 0 ? (
            <>
              <div className='h-[90%] flex'>
                <Sidebar />
                <Display />
              </div>
              <Player />
            </>
          ) : null // You can add a fallback here (e.g., a loading spinner or message)
        )
      )}
      <audio ref={audioRef} src={track ? track.file : ''} preload='auto'></audio>
    </div>
  );
};

export default App;
