const express = require("express");
const router = express();
const upsertStudent = require("../collections/getStudentCollection");
const { ObjectId } = require("mongodb");
const { deleteStudentSchema } = require("../schema/validation");

router.delete("/deletestudent", async (req, res) => {
  const { id } = req.query;
  const accessStudent = await upsertStudent();
  try {
    await deleteStudentSchema.validateAsync({
      id,
    });
    const isStudent = await accessStudent.findOne({ _id: new ObjectId(id) });
    if (!isStudent) {
      return res
        .status(404)
        .send({ message: `No student with that email exists` });
    }
    const { acknowledged } = await accessStudent.deleteOne({
      _id: new ObjectId(isStudent._id),
    });

    if (!acknowledged) {
      return res.status(500).send({ message: "Cannot delete student !" });
    }
    const studentData = await accessStudent.find({}).toArray();
    res.status(200).send({ message: "Student deleted !", data: studentData });
  } catch (error) {
    const err = error.details[0].message;
    const formattedError = err.replace(/\\/g, "").replace(/"/g, "");
    res.status(400).send({ message: formattedError });
  }
});

module.exports = router;
