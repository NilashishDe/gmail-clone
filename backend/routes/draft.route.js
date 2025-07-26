import express from "express";
import { saveDraft, getDrafts, deleteDraft } from "../controllers/draft.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/").post(isAuthenticated, saveDraft);
router.route("/").get(isAuthenticated, getDrafts);
router.route("/:id").delete(isAuthenticated, deleteDraft);

export default router;
