import express from "express";
import { param } from "express-validator";
import { createJournalist, getAllJournalists, getJournalistById, updateJournalist } from '../controllers/journalistController.js';

const router = express.Router();

// Créer un nouveau journaliste
router.post("/", createJournalist);

// Obtenir tous les journalistes
router.get("/", getAllJournalists);

// Obtenir un journaliste par ID
router.get("/:id", [
  param("id").isMongoId(),
], getJournalistById);

// Mettre à jour un journaliste
router.put("/:id", [
  param("id").isMongoId(),
], updateJournalist);

export default router;
