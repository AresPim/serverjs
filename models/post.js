import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const postSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required: false
        },
        title: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        category: { //contentType
            type: String,
            required: true
        },
        verified: {
            type: Boolean,
            //required: false
        },
        credibilityScore: { //pourcentage
            type: Number,
            //required: false
        },
        votes: {
            type: Schema.Types.ObjectId, 
            ref: 'Vote',
            //required: false
        },
        comments: {
            type: Schema.Types.ObjectId, 
            ref: 'Comment',
            //required: false
        },
        likes: {
            type: Number,
            //required: false
        },
        dislikes: {
            type: Number,
            //required: false
        },
        reports: { //Nombre de signalements
            type: Number,
           // required: false
        } 
    },
    {
        timestamps: true
    }
);

export default model('Post', postSchema);
