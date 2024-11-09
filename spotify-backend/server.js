// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import songRouter from './src/routes/songRoute.js';
// import connectCloudinary from './src/config/cloudinary.js';
// import connectDB from './src/config/mongodb.js';
// import albumRouter from './src/routes/albumRoute.js';


// //app config

// const app = express();
// const port = process.env.PORT  || 4000;
// connectDB();
// connectCloudinary();



// //middlewares
// app.use(express.json());
// app.use(cors())

// //initializing routes
// app.use("/api/song", songRouter)
// app.use("/api/album", albumRouter)

// app.get('/',(req,res)=>res.send("API Working"))

// app.listen(port,()=>console.log(`Server started on ${port}`))

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import songRouter from './src/routes/songRoute.js';
import connectCloudinary from './src/config/cloudinary.js';
import connectDB from './src/config/mongodb.js';
import albumRouter from './src/routes/albumRoute.js';

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Configure CORS to allow requests from multiple frontends
const allowedOrigins = [
  'https://spotify-clone-admin-s3hd.onrender.com',
  'https://spotify-clone-ishita.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  }
}));

// middlewares
app.use(express.json());

// initializing routes
app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);

app.get('/', (req, res) => res.send("API Working"));

// Start server
app.listen(port, () => console.log(`Server started on ${port}`));
