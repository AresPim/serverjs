import express from "express";
import multer from "multer";
import { body, param } from "express-validator";
import { createPost, updatePost, getAllPosts, getPostById } from "../controllers/postController.js";

const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set your desired destination folder for uploads
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Créer un nouveau poste
router.post("/", [
  upload.single("image"), // Use the "image" field name from the Flutter code
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
