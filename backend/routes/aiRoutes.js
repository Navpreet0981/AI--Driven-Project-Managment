const express = require("express");
const { getTaskRecommendations } = require("../controllers/aiController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/recommendations", protect, getTaskRecommendations);

module.exports = router;
