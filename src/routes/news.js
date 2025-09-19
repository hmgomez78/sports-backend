const express = require("express");
const router = express.Router();

// Example route
router.get("/", (req, res) => {
  res.json({
    message: "Latest sports news",
    data: [
      { id: 1, title: "Team A won the championship" },
      { id: 2, title: "Player B transferred to Team C" },
    ],
  });
});

module.exports = router;
