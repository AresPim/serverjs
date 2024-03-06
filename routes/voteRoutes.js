import express from "express";
import { body, param } from "express-validator";
import { saveVote, getAllVotes, getVoteById } from "../controllers/voteController.js";

const router = express.Router();

// Créer un nouveau vote
router.post("/", [
  body("userId").isMongoId(),
  body("postId").isMongoId(),
  body("isTrue").isBoolean(),
], saveVote);

// Obtenir tous les votes
router.get("/", getAllVotes);

// Obtenir un vote par ID
router.get("/:id", [
  param("id").isMongoId(),
], getVoteById);

export default router;
