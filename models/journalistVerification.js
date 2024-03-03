import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const journalistVerificationSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        cardDetails: [{  //Array contennat les IDs des cartes
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'CardDetails',
            required: true 
        }],
        documentType: { 
            type: String,
            enum: ['IDCard', 'Passport'] 
        },
        documentNumber: { 
            type: String 
        },
        documentImage: { 
          data: Buffer, 
          contentType: String 
        },
        status: { 
            type: String, 
            enum: ['pending', 'approved', 'rejected'], 
            default: 'pending' 
        }, 
        adminId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Admin' 
        },
    
   /**  
        passportNbr: {
            type: String, 
            required: true
        },
        idCardNbr: {
            type: String, 
            required: true
        },
        idCardImage: {
            type: String, // Chemin de l'image de la carte d'identité
            //required: true
        },
        passportImage: {
            type: String, // Chemin de l'image du passeport
            //required: true
        },
        
        bankCards: [
            {
                type: {
                    type: String,
                    enum: ['Visa', 'Mastercard', 'PayPal', 'Apple Pay'],
                    required: true
                },
                cardNumber: {
                    type: String,
                    required: true
                },
                ownerName: {
                    type: String,
                    required: true
                },
                expirationDate: {
                    type: Date,
                    required: true
                },
                cvv: {
                    type: String,
                    required: true
                }
            }
        ],
    */ 

    },
    {
        timestamps: true
    }
);

export default model('JournalistVerification', journalistVerificationSchema);