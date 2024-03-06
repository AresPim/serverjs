import express from "express";
import { body, param } from "express-validator";
import { createMessage, getAllMessages, getMessageById, deleteMessage } from '../controllers/messageController.js';

const router = express.Router();

// Créer un nouveau message
router.post("/", [
  body("userId").isMongoId(),
  body("content").notEmpty(),
], createMessage);

// Obtenir tous les messages
router.get("/", getAllMessages);

// Obtenir un message par ID
router.get("/:id", [
  param("id").isMongoId(),
], getMessageById);

// Supprimer un message
router.delete("/:id", [
  param("id").isMongoId(),
], deleteMessage);

export default router;
