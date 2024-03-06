import express from "express";
import { body, param } from "express-validator";
import { createReport, getAllReports, getReportById, updateReport } from "../controllers/reportController.js";

const router = express.Router();
// Create a new report
router.post("/", [
  body("userId").isMongoId(),
  body("postId").isMongoId(),
  body("reason").notEmpty(),
  body("status").isIn(["pending", "approved", "rejected"]),
], createReport);
// Get all reports
router.get("/", getAllReports);
// Get report by id
router.get("/:id", [
  param("id").isMongoId(),
], getReportById);
// Update report
router.put("/:id", [
  param("id").isMongoId(),
  body("status").isIn(["pending", "approved", "rejected"]),
], updateReport);

export default router;
