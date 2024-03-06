import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const blockchainContractSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        contractAddress: {
            type: String, 
            required: true
        },
        transactionHash: {
            type: String, 
            required: true
        },
        description: {
            type: String,
            required: true
        },
        contractType: {
            type: String,
            enum: ['Smart Contract', 'Token Contract', 'Other'],
            default: 'Smart Contract'
        },
        status: {
            type: String,
            enum: ['Draft', 'Signed', 'Active', 'Completed', 'Suspended'],
            default: 'Draft',
            required: true
        },
        fees: {
            type: Number,
            default: 0
        },
        transactionHistory: [{
            transactionHash: String,
            date: { type: Date, default: Date.now }
        }]
    },
    {
        timestamps: true
    }
);

export default model('BlockchainContract', blockchainContractSchema);