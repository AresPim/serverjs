import express from "express";
import { body, param } from "express-validator";
import { createPost, updatePost, getAllPosts, getPostById } from "../controllers/postController.js";

const router = express.Router();

// Créer un nouveau poste
router.post("/", [
  body("title").notEmpty(),
  body("content").notEmpty(),
  body("category").notEmpty(),
  body("userId").isMongoId(),
], createPost);

// Mettre à jour un poste existant
router.put("/:id", [
  param("id").isMongoId(),
  body("title").notEmpty(),
  body("content").notEmpty(),
  body("category").notEmpty(),
], updatePost);

// Obtenir tous les postes
router.get("/", getAllPosts);

// Obtenir un poste par ID
router.get("/:id", [
  param("id").isMongoId(),
], getPostById);

export default router;
