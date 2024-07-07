import express from "express";
import {
  createContact,
  deleteContact,
  getContact,
  getsingleContact,
  updateContact,
} from "../controllers/contactmeControllers.js";
const router = express.Router();
router.get("/", getContact);
router.get("/:id", getsingleContact);
router.post("/", createContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);
export default router;
