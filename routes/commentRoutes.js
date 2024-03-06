import express from "express";
import { body, param } from "express-validator";
import { createComment, getAllComments, getCommentById, deleteComment } from '../controllers/commentController.js';

const router = express.Router();

// Créer un nouveau commentaire
router.post("/", [
  body("userId").isMongoId(),
  body("content").notEmpty(),
], createComment);

// Obtenir tous les commentaires
router.get("/", getAllComments);

// Obtenir un commentaire par ID
router.get("/:id", [
  param("id").isMongoId(),
], getCommentById);

// Supprimer un commentaire par ID
router.delete("/:id", [
  param("id").isMongoId(),
], deleteComment);

export default router;
