import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const messageSchema = new Schema({
    userId: {
         type: Schema.Types.ObjectId, 
        ref: 'User',
       // required: true 
    },
    content: {
        type: String,
        required: true
    }
    },
    {
        timestamps: true
    }
);

export default model('Message', messageSchema);
