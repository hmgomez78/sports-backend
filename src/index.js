import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import newsRoutes from "./routes/news.js";
import oddsRoutes from "./routes/odds.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", ts: Date.now() });
});

// API routes
app.use("/news", newsRoutes);
app.use("/odds", oddsRoutes);

app.listen(PORT, () => {
  console.log(`Sports backend running on port ${PORT}`);
});

