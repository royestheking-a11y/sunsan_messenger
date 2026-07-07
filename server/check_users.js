import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load env
dotenv.config({ path: './.env' });

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatar: String,
    role: String
}, { strict: false });

const User = mongoose.model('User', userSchema);

async function run() {
    try {
        console.log('Connecting to', process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected!');
        
        const users = await User.find({}, 'name email avatar role');
        console.log('\n--- USERS IN DB ---');
        console.log(JSON.stringify(users, null, 2));
        
        await mongoose.disconnect();
    } catch (e) {
        console.error(e);
    }
}

run();
