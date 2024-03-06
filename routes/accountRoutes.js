import express from "express";
const router = express.Router();
import { deleteAccount, deactivateAccount } from '../controllers/accountController.js';

// Routes pour supprimer et désactiver le compte utilisateur
router.delete("/delete-account/:id", deleteAccount);
router.put("/deactivate-account/:id", deactivateAccount);

export default router;
