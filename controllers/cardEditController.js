import CardEdit from "../models/cardDetails.js.js";

export async function saveCardEdit(req, res) {
  try {
    // Logique pour enregistrer l'édition de la carte
    const { userId, cardNumber, cardOwner, cardType, expirationDate, cvv, cardImage } = req.body;

    // Créez une nouvelle instance du modèle CardEdit
    const cardEdit = new CardEdit({
      userId,
      cardNumber,
      cardOwner,
      cardType,
      expirationDate,
      cvv,
      cardImage: { data: Buffer.from(cardImage, 'base64'), contentType: 'image/jpeg' }
    });

    // Enregistrez les données dans la base de données
    await cardEdit.save();

    res.status(200).json({ message: 'Card details saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
//Update card 
export async function updateCard(req, res) {
    const { id } = req.params;
    const { cardNumber, cardOwner, expirationDate, cvv, cardImage, status } = req.body;
  
    try {
      const updatedVerification = await JournalistVerification.findByIdAndUpdate(id, { cardNumber, cardOwner, expirationDate, cvv, cardImage, status }, { new: true });
      if (updatedVerification) {
        res.status(200).json(updatedVerification);
      } else {
        res.status(404).json({ message: "Vérification du journaliste non trouvée" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  //get all cards 
  export async function getAllCards(req, res) {
    try {
      const verifications = await JournalistVerification.find({});
      res.status(200).json(verifications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  //Get card by id
  export async function getCardById(req, res) {
    const { id } = req.params;
  
    try {
      const verification = await JournalistVerification.findById(id);
      if (verification) {
        res.status(200).json(verification);
      } else {
        res.status(404).json({ message: "Vérification du journaliste non trouvée" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  