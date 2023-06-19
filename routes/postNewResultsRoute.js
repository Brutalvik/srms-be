const express = require("express");
const router = express();
const getAllResults = require("../collections/getResultsCollection");
const { postResultsSchema } = require("../schema/validation");

router.post("/addresult", async (req, res) => {
  try {
    await postResultsSchema.validateAsync(req.body);
    const results = req.body;

    const accessResults = await getAllResults();

    const postNewResult = await accessResults.insertOne(results);

    if (!postNewResult.acknowledged) {
      res.status(500).send({ message: "Internal server error" });
    }

    res.status(200).send({
      message: `${results.studentName}'s result added successfully`,
    });
  } catch (error) {
    const err = error.details[0].message;
    const formattedError = err.replace(/\\/g, "").replace(/"/g, "");
    res.status(400).send({ message: formattedError });
  }
});

module.exports = router;
