import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const migrateDbVocaToSunsan = async () => {
    try {
        const dbUri = process.env.MONGODB_URI || process.env.MONGO_URI;
        if (!dbUri) {
            console.error('❌ MONGODB_URI/MONGO_URI is not set in server/.env');
            process.exit(1);
        }

        console.log('🔗 Connecting to MongoDB Atlas...');
        await mongoose.connect(dbUri);
        console.log('✅ Connected to MongoDB');

        const User = mongoose.connection.collection('users');
        const Message = mongoose.connection.collection('messages');

        // 1. Update Voca Team user profile to Sunsan Team
        console.log('🔄 Checking Voca Team user...');
        const vocaTeamUser = await User.findOne({ isVocaTeam: true });
        
        if (vocaTeamUser) {
            console.log('👤 Found Voca Team user. Updating profile...');
            const updateResult = await User.updateOne(
                { _id: vocaTeamUser._id },
                {
                    $set: {
                        name: 'Sunsan Team',
                        email: 'team@sunsan.com',
                        avatar: '/sunsanlogo.png',
                        about: 'Official Sunsan Team - Announcements & Updates'
                    }
                }
            );
            console.log(`✅ Updated Voca Team user profile: ${JSON.stringify(updateResult)}`);
        } else {
            console.log('⚠️ isVocaTeam: true user not found. Checking by email team@voca.com...');
            const vocaTeamByEmail = await User.findOne({ email: 'team@voca.com' });
            if (vocaTeamByEmail) {
                const updateResult = await User.updateOne(
                    { _id: vocaTeamByEmail._id },
                    {
                        $set: {
                            name: 'Sunsan Team',
                            email: 'team@sunsan.com',
                            avatar: '/sunsanlogo.png',
                            about: 'Official Sunsan Team - Announcements & Updates',
                            isVocaTeam: true
                        }
                    }
                );
                console.log(`✅ Updated team@voca.com user profile: ${JSON.stringify(updateResult)}`);
            } else {
                console.log('❌ No team user found to update.');
            }
        }

        // Get the updated team user details to update messages
        const teamUser = await User.findOne({ isVocaTeam: true });
        if (teamUser) {
            console.log(`🔄 Scanning messages sent by team user (${teamUser._id})...`);
            
            // Find all messages sent by the team user
            const messages = await Message.find({ senderId: teamUser._id }).toArray();
            console.log(`✉️ Found ${messages.length} messages sent by team user.`);

            let updateCount = 0;
            for (const msg of messages) {
                if (msg.content && (msg.content.includes('Voca') || msg.content.includes('voca'))) {
                    const newContent = msg.content
                        .replace(/Welcome to Voca/g, 'Welcome to Sunsan Messenger')
                        .replace(/Voca is your space/g, 'Sunsan Messenger is your space')
                        .replace(/journey on Voca/g, 'journey on Sunsan Messenger')
                        .replace(/Voca journey/g, 'Sunsan Messenger journey');
                    
                    await Message.updateOne(
                        { _id: msg._id },
                        { $set: { content: newContent } }
                    );
                    updateCount++;
                }
            }
            console.log(`✅ Updated content for ${updateCount} messages.`);
        }

        await mongoose.connection.close();
        console.log('🔌 Disconnected from MongoDB. Migration completed successfully! 🎉');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error executing migration:', error);
        process.exit(1);
    }
};

migrateDbVocaToSunsan();
