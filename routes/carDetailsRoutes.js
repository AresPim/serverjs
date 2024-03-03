import express from "express";
import { body, param } from "express-validator";
import { saveCard, getAllCards, getCardById, updateCard } from '../controllers/cardEditController.js';

const router = express.Router();

// Créer une nouvelle vérification de journaliste
router.post("/", [
  body("userId").isMongoId(),
  body("cardNumber").notEmpty(),
  body("cardOwner").notEmpty(),
  body("cardType").notEmpty(),
  body("expirationDate").isDate(),
  body("cvv").notEmpty(),
  body("cardImage").notEmpty().isBase64().withMessage("Document image must be a base64 string"),
], saveCard);

// Obtenir toutes les vérifications de journalistes
router.get("/", getAllCards);

// Obtenir une vérification de journaliste par ID
router.get("/:id", [
  param("id").isMongoId(),
], getCardById);

// Mettre à jour une vérification de journaliste par ID
router.put("/:id", [
  param("cardNumber").notEmpty(),
  body("cardOwner").notEmpty(),
  body("cardType").notEmpty(),
  body("expirationDate").isDate(),
  body("status").notEmpty(),
  body("cardImage").notEmpty().isBase64().withMessage("Document image must be a base64 string"),
], updateCard);

export default router;
