const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Import routes
const newsRoutes = require("./routes/news");
const oddsRoutes = require("./routes/odds");

// Mount routes
app.use("/news", newsRoutes);
app.use("/odds", oddsRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", ts: Date.now() });
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Sports backend running on port ${PORT}`);
});
