import JournalistVerification from "../models/journalistVerification.js";
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
//Update journalist verification
export async function updateJournalistVerification(req, res) {
  const { id } = req.params;
  const { userId, documents, status, adminId } = req.body;

  try {
    const updatedVerification = await JournalistVerification.findByIdAndUpdate(id, { userId, documents, status, adminId }, { new: true });
    if (updatedVerification) {
      res.status(200).json(updatedVerification);
    } else {
      res.status(404).json({ message: "Vérification du journaliste non trouvée" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
//Delete journalist verification
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
