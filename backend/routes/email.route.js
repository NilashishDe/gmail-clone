import express from "express";
import { createEmail, deleteEmail, getAllEmailsById, getSentEmails } from "../controllers/email.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createEmail);
router.route("/delete/:id").delete(isAuthenticated, deleteEmail);
router.route("/getall").get(isAuthenticated, getAllEmailsById);
router.route("/sent").get(isAuthenticated, getSentEmails); // <-- ADD THIS ROUTE

export default router;
