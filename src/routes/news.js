import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/", async (req, res) => {
  const query = req.query.query || "football";
  try {
    const apiKey = process.env.NEWSAPI_KEY;
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
