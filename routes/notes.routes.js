import express from "express";
import {
    createNote,
    getAllNotes,
    updateNote,
    searchNotes
} from "../controllers/notes.controller.js";

import { createNoteRateLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post("/", createNoteRateLimiter, createNote);
router.get("/", getAllNotes);
router.put("/:id", updateNote);
router.get("/search", searchNotes);

export default router;
