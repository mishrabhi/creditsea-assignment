const express = require("express");
const creditReport = require("../models/creditReport");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const reports = await creditReport.find();
    res.status(200), json(reports);
  } catch (error) {
    res.status(500), json({ message: "Error fetching reports" });
  }
});

module.exports = router;
