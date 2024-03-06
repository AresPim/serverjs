import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const reportSchema = new Schema(
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
        reason: {
            type: String, 
            required: true
        },
        status: {
            type: String,
            //required: true
        }
    },
    {
        timestamps: true
    }
);

export default model('Report', reportSchema);


