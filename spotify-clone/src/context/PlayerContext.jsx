import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const url = 'https://spotify-clone-backend-x63h.onrender.com';

    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [isLooping, setIsLooping] = useState(false); // Loop state
    const [isShuffling, setIsShuffling] = useState(false); // Shuffle state
    const [volume, setVolume] = useState(1);

    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    });

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    };

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    };

    const playWithId = async (id) => {
        await songsData.map((item) => {
            if (id === item._id) {
                setTrack(item);
            }
        });
        await audioRef.current.play();
        setPlayStatus(true);
    };

    const previous = async () => {
        songsData.map(async (item, index) => {
            if (track._id === item._id && index > 0) {
                await setTrack(songsData[index - 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        });
    };

    const next = async () => {
        songsData.map(async (item, index) => {
            if (track._id === item._id) {
                if (isShuffling) {
                    const randomIndex = Math.floor(Math.random() * songsData.length);
                    await setTrack(songsData[randomIndex]);
                } else if (index < songsData.length - 1) {
                    await setTrack(songsData[index + 1]);
                } else {
                    await setTrack(songsData[0]); // Start from the first song if last song ends
                }
                await audioRef.current.play();
                setPlayStatus(true);
            }
        });
    };

    const seekSong = (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
    };

    const getSongsData = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`);
            setSongsData(response.data.songs);
            setTrack(response.data.songs[0]);
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
    };

    const getAlbumData = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            setAlbumsData(response.data.albums);
        } catch (error) {
            console.error('Error fetching albums:', error);
        }
    };

    const changeVolume = (newVolume) => {
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
    };

    // Toggle loop state
    const toggleLoop = () => {
        setIsLooping(!isLooping);
    };

    // Toggle shuffle state
    const toggleShuffle = () => {
        setIsShuffling(!isShuffling);
    };

    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";

                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60),
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60),
                    }
                });
            };
        }, 1000);

        // Add event listener for when the song ends
        audioRef.current.onended = () => {
            if (isLooping) {
                // Replay the current song if looping is enabled
                audioRef.current.currentTime = 0; // Restart the song
                audioRef.current.play(); // Play again
            } else {
                // Otherwise, move to the next song
                next();
            }
        };
    }, [audioRef, isLooping]);

    useEffect(() => {
        getSongsData();
        getAlbumData();
    }, []);

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track, setTrack,
        playStatus, setPlayStatus, play, pause,
        time, setTime,
        playWithId,
        previous, next,
        seekSong,
        songsData,
        albumsData,
        isLooping, toggleLoop,
        isShuffling, toggleShuffle,
        volume, changeVolume, 
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
