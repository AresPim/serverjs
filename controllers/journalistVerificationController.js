import JournalistVerification from "../models/journalistVerification.js";

export async function saveDocumentVerification(req, res) {
  try {
    // Logique pour enregistrer la vérification des documents
    const { userId, documentType, documentNumber, documentImage } = req.body;

    // Créez une nouvelle instance du modèle DocumentVerification
    const documentVerification = new DocumentVerification({
      userId,
      documentType,
      documentNumber,
      documentImage: { data: Buffer.from(documentImage, 'base64'), contentType: 'image/jpeg' }
    });

    // Enregistrez les données dans la base de données
    await documentVerification.save();

    res.status(200).json({ message: 'Document verification saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/** 
//Create a new journalist verification
export async function createJournalistVerification(req, res) {
  const { userId, documents, status, adminId } = req.body;

  try {
    const newVerification = await JournalistVerification.create({ userId, documents, status, adminId });
    res.status(201).json(newVerification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
*/
//Update journalist verification
export async function updateJournalistVerification(req, res) {
  const { id } = req.params;
  const { documentType, documentNumber, documentImage, status } = req.body;

  try {
    const updatedVerification = await JournalistVerification.findByIdAndUpdate(id, { documentType, documentNumber, documentImage, status }, { new: true });
    if (updatedVerification) {
      res.status(200).json(updatedVerification);
    } else {
      res.status(404).json({ message: "Vérification du journaliste non trouvée" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
//get all journalist verification
export async function getAllJournalistVerifications(req, res) {
  try {
    const verifications = await JournalistVerification.find({});
    res.status(200).json(verifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
//Get journalist verification by id
export async function getJournalistVerificationById(req, res) {
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
