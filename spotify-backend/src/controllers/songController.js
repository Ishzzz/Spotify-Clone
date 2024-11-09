import { v2 as cloudinary } from 'cloudinary'
import songModel from '../models/songModel.js';
import albumModel from '../models/albumModel.js';

const addSong = async (req, res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];
        // const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
        // const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
        //console.log('Audio Upload:', audioUpload);  // Log to check if audio is uploading

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        //console.log('Image Upload:', imageUpload);  // Log to check if image is uploading

        const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`

        const songData = {
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration
        }

        const song = songModel(songData);
        await song.save();

        res.json({ success: true, message: "Song Added" })

    } catch (error) {

        console.error('Error:', error);  // Log the error message
        res.json({ success: false, error: error.message });

    }
}

const listSong = async (req, res) => {

    try {
        
        const allSongs = await songModel.find({});
        res.json({success:true, songs: allSongs});

    } catch (error) {
        
        res.json({success:false});

    }

}

const removeSong = async(req,res) =>{

    try {
        
        await songModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"song removed"});

    } catch (error) {
        
        res.json({success:false});

    }

}

const searchContent = async (req, res) => {
    try {
        const query = req.query.q; // Extract search query from request

        // Search for songs matching the query (based on name or description)
        const songs = await songModel.find({
            name: { $regex: query, $options: 'i' }, // Case-insensitive search
        });

        // Search for albums matching the query (based on name or description)
        const albums = await albumModel.find({
            name: { $regex: query, $options: 'i' }, // Case-insensitive search
        });

        res.json({
            success: true,
            songs,
            albums,
        });
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).json({ success: false, message: 'Search error' });
    }
};

export { addSong, listSong, removeSong, searchContent };
