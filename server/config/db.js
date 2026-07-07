import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const dbUri = process.env.MONGODB_URI || process.env.MONGO_URI;
        if (!dbUri) {
            throw new Error("Database connection URI is not set. Please define MONGODB_URI or MONGO_URI in your Environment Variables.");
        }
        const conn = await mongoose.connect(dbUri);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        // process.exit(1); // Keep server alive for health checks
    }
};

export default connectDB;
