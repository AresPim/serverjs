import cardDetails from "../models/cardDetails.js";

export async function saveCard(req, res) {
  try {
    // Logique pour enregistrer l'édition de la carte
    const { userId, cardNumber, cardOwner, cardType, expirationDate, cvv, cardImage } = req.body;

    // Créez une nouvelle instance du modèle cardDetails
    const cardDetails = new cardDetails({
      userId,
      cardNumber,
      cardOwner,
      cardType,
      expirationDate,
      cvv,
      cardImage: { data: Buffer.from(cardImage, 'base64'), contentType: 'image/jpeg' }
    });

    // Enregistrez les données dans la base de données
    await cardDetails.save();

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
      const updatedCard = await cardDetails.findByIdAndUpdate(id, { cardNumber, cardOwner, expirationDate, cvv, cardImage, status }, { new: true });
      if (updatedCard) {
        res.status(200).json(updatedCard);
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
      const cards = await cardDetails.find({});
      res.status(200).json(cards);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  //Get card by id
  export async function getCardById(req, res) {
    const { id } = req.params;
  
    try {
      const card = await cardDetails.findById(id);
      if (verification) {
        res.status(200).json(card);
      } else {
        res.status(404).json({ message: "Vérification du journaliste non trouvée" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  