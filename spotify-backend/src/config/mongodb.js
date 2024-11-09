// import mongoose from "mongoose";

// const connectDB = async () =>{

//     mongoose.connection.on('connected',()=>{
//         console.log("connection established");
//     })

//     // await mongoose.connect(`${process.env.MONGODB_URI}/spotify`);
//     await mongoose.connect(process.env.MONGODB_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         dbName: 'spotify'  // Specify the database name here
//     });
    

// }

// export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log("MongoDB connection established");
    });

    mongoose.connection.on('error', (err) => {
        console.error("MongoDB connection error:", err);
    });

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'spotify'  // Specify the database name here
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process if the connection fails
    }
};

export default connectDB;
