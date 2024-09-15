import mongoose from 'mongoose';


// Function to connecte to Mongodb database
const connectDB = async () =>{
    try {
        const dbResponse = await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connected Successfully: ", dbResponse.connection.host);
    } catch (error) {
        console.log("Unable to Connect to Database: ", error);
    }
}

export default connectDB;