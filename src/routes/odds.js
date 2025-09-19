const express = require("express");
const router = express.Router();

// Example route
router.get("/", (req, res) => {
  res.json({
    message: "Current betting odds",
    odds: {
      match1: "1.5",
      match2: "2.3",
    },
  });
});

module.exports = router;
