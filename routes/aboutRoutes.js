import express from "express";
import {
  addAbout,
  deleteAbout,
  getAbout,
  updateAbout,
} from "../controllers/aboutControllers.js";

const router = express();
router.get("/", getAbout);
router.post("/", addAbout);
router.put("/:id", updateAbout);
router.delete("/:id", deleteAbout);
export default router;
