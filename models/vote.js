import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const voteSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true
        },
        isTrue: { 
            type: Boolean, //user va voter oui ou non pour vraie ou fausse nouvelle  
            required: true
        },
    },
    {
        timestamps: true
    }
);

export default model('Vote', voteSchema);