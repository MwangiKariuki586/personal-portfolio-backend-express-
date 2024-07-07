import express from "express";
import {
  createDatabase_experience,
  deleteDatabase_experience,
  getDatabase_experience,
  getSingle,
  updateDatabase_experience,
} from "../controllers/databaseexperienceControllers.js";
const router = express.Router();
router.get("/", getDatabase_experience);
router.get("/:id", getSingle);
router.post("/", createDatabase_experience);
router.put("/:id", updateDatabase_experience);
router.delete("/:id", deleteDatabase_experience);
export default router;
