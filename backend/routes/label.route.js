import express from "express";
import { createLabel, getLabels, deleteLabel } from "../controllers/label.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createLabel);
router.route("/").get(isAuthenticated, getLabels);
router.route("/:id").delete(isAuthenticated, deleteLabel);

export default router;
