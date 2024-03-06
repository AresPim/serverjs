import express from "express";
import { body, param } from "express-validator";
import { createContract, getAllContracts, getContractById, updateContract, deleteContract } from '../controllers/blockchainContractController.js';

const router = express.Router();

// Créer un nouveau contrat blockchain
router.post("/", [
  body("userId").isMongoId(),
  body("contractAddress").notEmpty(),
  body("transactionHash").notEmpty(),
  body("description").notEmpty(),
  body("contractType").isIn(['Smart Contract', 'Token Contract', 'Other']).optional(),
], createContract);

// Obtenir tous les contrats blockchain
router.get("/", getAllContracts);

// Obtenir un contrat par son ID
router.get("/:id", [
  param("id").isMongoId(),
], getContractById);

// Mettre à jour un contrat par son ID
router.put("/:id", [
  param("id").isMongoId(),
  body("userId").isMongoId(),
  body("contractAddress").notEmpty(),
  body("transactionHash").notEmpty(),
  body("description").notEmpty(),
  body("contractType").isIn(['Smart Contract', 'Token Contract', 'Other']).optional(),
], updateContract);

// Supprimer un contrat par son ID
router.delete("/:id", [
  param("id").isMongoId(),
], deleteContract);

export default router;
