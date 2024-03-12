import cardDetails from "../models/cardDetails.js";

export const saveCard = async (req, res) => {
  try {
    const { userId, cardNumber, cardOwner, cardType, expirationDate, cvv } = req.body;
    const newCard = await cardDetails.create({ userId, cardNumber, cardOwner, cardType, expirationDate, cvv });
      res.status(201).json(newCard);
  } catch (error) {
      res.status(500).json({ error: error.message });
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
        res.status(404).json({ message: "Carte non trouvée" });
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
      if (card) {
        res.status(200).json(card);
      } else {
        res.status(404).json({ message: "Carte non trouvée" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  