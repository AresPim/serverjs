import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const cardDetailsSchema = new Schema(
  {
      userId: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'User' 
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
      cardType: { 
          type: String, 
          enum: ['Visa', 'Mastercard', 'Paypal', 'Apple Pay'], 
          default: 'Visa' 
      },
      cardNumber: { 
          type: String 
      },
      cardOwner: { 
          type: String 
      },
      expirationDate: { 
          type: Date 
      },
      cvv: { 
          type: String 
      },
      cardImage: { 
        data: Buffer, 
        contentType: String 
      },
  },
  {
    timestamps: true
  }
);

export default model('CardDetails', cardDetailsSchema);
