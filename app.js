import express from "express";
import notesRoutes from "./routes/notes.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

app.use("/notes", notesRoutes);

// Global error handler
app.use(errorHandler);

export default app;
