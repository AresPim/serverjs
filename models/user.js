import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            enum: ['male', 'female'], 
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        role: {
            type: String,
            //required: true,
            enum: ['Simple User', 'Journalist'],
            default: 'Simple User' 
        },
        profileImage: {
            type: String,
            //required: true
        },
        hederaAccountId: {
            type: String,
            //required: true
        },
        publicKey: {
            type: String,
            //required: true
        },
        reputation: {
            type: Number,
            //required: true
        },
        badgeReputation: {
            type: String,
            //required: true
        },
        votesCount: {
            type: Number,
            default: 0
        },
        badgeAchievement: { 
            type: String,
            //required: true
        },
        voteHistory: {
            type: Schema.Types.ObjectId,
            ref: 'Vote',
            //required: true
        },
        chatHistory: {
            type: Schema.Types.ObjectId,
            ref: 'Message', 
            //required: true
        },
        followedJournalists: [{
            type: Schema.Types.ObjectId,
            ref: 'Journalist',
            //required: true
        }],
        savedPosts: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            //required: true
        },
        reports: {
            type: Schema.Types.ObjectId,
            ref: 'Report',
            //required: true
        },
        
    },
    {
        timestamps: true
    }
);

export default model('User', userSchema);