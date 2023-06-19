const express = require("express");
const router = express();
const getAllResults = require("../collections/getResultsCollection");

router.get("/results", async (req, res) => {
  try {
    const accessResults = await getAllResults();
    const resultsData = await accessResults.find({}).toArray();
    res.status(200).send(resultsData);
  } catch (error) {
    res.status(400).send({
      message: "Unable to fetch course data",
    });
  }
});

module.exports = router;
