import { v4 as uuid } from "uuid";
import { cleanString, isEmptyString } from "../utils/helpers.js";

// In-memory store
let notes = [];

/* ---------------- CREATE NOTE ---------------- */
export const createNote = (req, res) => {
    let { title, content } = req.body;

    title = cleanString(title);
    content = cleanString(content);

    if (isEmptyString(title) || isEmptyString(content)) {
        return res.status(400).json({
            message: "Title and content are required and cannot be empty"
        });
    }

    const now = new Date();

    const note = {
        id: uuid(),
        title,
        content,
        created_at: now,
        updated_at: now
    };

    notes.push(note);

    res.status(201).json(note);
};

/* ---------------- GET ALL NOTES ---------------- */
export const getAllNotes = (req, res) => {
    const sortedNotes = [...notes].sort(
        (a, b) => b.updated_at - a.updated_at
    );

    res.json(sortedNotes);
};

/* ---------------- UPDATE NOTE ---------------- */
export const updateNote = (req, res) => {
    const { id } = req.params;
    let { title, content } = req.body;

    const note = notes.find(n => n.id === id);

    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }

    let isUpdated = false;

    if (title !== undefined) {
        title = cleanString(title);
        if (!isEmptyString(title) && title !== note.title) {
            note.title = title;
            isUpdated = true;
        }
    }

    if (content !== undefined) {
        content = cleanString(content);
        if (!isEmptyString(content) && content !== note.content) {
            note.content = content;
            isUpdated = true;
        }
    }

    if (!isUpdated) {
        return res.status(200).json({
            message: "No changes detected. Note not updated."
        });
    }

    note.updated_at = new Date();

    res.json(note);
};

/* ---------------- SEARCH NOTES ---------------- */
export const searchNotes = (req, res) => {
    let { q } = req.query;

    if (!q || isEmptyString(q)) {
        return res.status(400).json({
            message: "Search query cannot be empty"
        });
    }

    q = cleanString(q).toLowerCase();

    const results = notes.filter(note =>
        note.title.toLowerCase().includes(q) ||
        note.content.toLowerCase().includes(q)
    );

    res.json(results);
};
