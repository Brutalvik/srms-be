const express = require("express");
const router = express();
const getAllStudents = require("../collections/getStudentCollection");

router.get("/students", async (req, res) => {
  try {
    const students = await getAllStudents();
    const studentData = await students.find({}).toArray();
    res.status(200).send(studentData);
  } catch (error) {
    res.status(400).send({
      message: "Unable to fetch student data",
    });
  }
});

module.exports = router;
