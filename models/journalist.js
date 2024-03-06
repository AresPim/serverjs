import mongoose from 'mongoose';
import User from './user.js';
const { Schema, model } = mongoose;

const journalistSchema = new Schema({
    ...User.schema.obj,
    bio: String,
    badge: String,
    articles: [{ type: Schema.Types.ObjectId, ref: 'Post' }] 
});

export default model('Journalist', journalistSchema);
