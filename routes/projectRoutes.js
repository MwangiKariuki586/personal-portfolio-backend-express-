import express from "express";

import {
  addProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../controllers/projectControllers.js";

const router = express.Router();

router.get("/", getProjects);
router.post("/", addProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
