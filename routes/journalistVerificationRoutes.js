import express from "express";
import { body, param } from "express-validator";
import { saveDocumentVerification, getAllJournalistVerifications, getJournalistVerificationById, updateJournalistVerification } from '../controllers/journalistVerificationController.js';

const router = express.Router();

// Créer une nouvelle vérification de journaliste
router.post("/", [
  body("userId").isMongoId(),
  body("documentType").notEmpty(),
  body("documentNumber").notEmpty(),
  body("cardDetails").isMongoId(),
  body("documentImage").notEmpty().isBase64().withMessage("Document image must be a base64 string"),
], saveDocumentVerification);

// Obtenir toutes les vérifications de journalistes
router.get("/", getAllJournalistVerifications);

// Obtenir une vérification de journaliste par ID
router.get("/:id", [
  param("id").isMongoId(),
], getJournalistVerificationById);

// Mettre à jour une vérification de journaliste par ID
router.put("/:id", [
  body("documentType").notEmpty(),
  body("documentNumber").notEmpty(),
  body("documentImage").notEmpty().isBase64().withMessage("Document image must be a base64 string"),
  body("status").notEmpty(),
], updateJournalistVerification);

export default router;
