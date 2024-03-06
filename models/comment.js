import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const commentSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        content: {
            type: String, 
            required: true
        },
        likes: {
            type: Number,
           // required: true
        },
        dislikes: {
            type: Number,
           // required: true
        },
        replies: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }]
    },
    {
        timestamps: true
    }
);

export default model('Comment', commentSchema );


