import mongoose from 'mongoose';
import dotenv from 'dotenv';
import './models/User.js'; // Ensure User is registered
import './models/Message.js';
import Chat from './models/Chat.js';

dotenv.config({ path: './.env' });

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected!');
        
        const chats = await Chat.find({})
            .populate('participants', 'name avatar status lastSeen isVocaTeam verified');
            
        console.log('\n--- CHATS POPULATED JSON ---');
        console.log(JSON.stringify(chats.map(c => c.toJSON()), null, 2));
        
        await mongoose.disconnect();
    } catch (e) {
        console.error(e);
    }
}

run();
