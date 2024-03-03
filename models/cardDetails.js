const mongoose = require('mongoose');

const cardDetailsSchema = new mongoose.Schema(
  {
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }, // ID de l'utilisateur associé
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  }, // État de l'édition de la carte
  adminId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Admin' 
  }, // ID de l'administrateur responsable
  cardType: { 
    type: String 
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

module.exports = mongoose.model('CardDetails', cardDetailsSchema);
