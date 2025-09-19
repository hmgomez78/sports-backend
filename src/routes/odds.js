const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const apiKey = process.env.ODDS_API_KEY;
    const sport = req.query.sport || "soccer";
    const url = `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${apiKey}&regions=eu&markets=h2h,spreads`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
