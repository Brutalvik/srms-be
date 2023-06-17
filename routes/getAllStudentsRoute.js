const express = require("express");
const router = express();
const getAllStudents = require("../collections/getStudentCollection");

router.get("/students", async (req, res) => {
  try {
    const accessStudent = await getAllStudents();
    const studentData = await accessStudent.find({}).toArray();
    res.status(200).send(studentData);
  } catch (error) {
    res.status(400).send({
      message: "Unable to fetch student data",
    });
  }
});

module.exports = router;
