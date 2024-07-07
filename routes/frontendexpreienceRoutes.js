import express from "express";
import {
  createFrontend_experience,
  deleteFrontend_experience,
  getFrontend_experience,
  getSingle,
  updateFrontend_experience,
} from "../controllers/frontendexperienceControllers.js";
const router = express.Router();
router.get("/", getFrontend_experience);
router.get("/:id", getSingle);
router.post("/", createFrontend_experience);
router.put("/:id", updateFrontend_experience);
router.delete("/:id", deleteFrontend_experience);
export default router;
