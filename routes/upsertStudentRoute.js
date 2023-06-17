const express = require("express");
const router = express();
const upsertStudent = require("../collections/getStudentCollection");
const Joi = require("joi");
const { ObjectId } = require("mongodb");
const { upsertStudentSchema } = require("../schema/validation");

router.put("/updatestudent", async (req, res) => {
  const { firstName, lastName, email, dateOfBirth } = req.body;
  const accessStudent = await upsertStudent();
  try {
    await upsertStudentSchema.validateAsync({
      firstName,
      lastName,
      email,
      dateOfBirth,
    });
    const isStudent = await accessStudent.findOne({ email: email });
    if (isStudent === null) {
      return res
        .status(404)
        .send({ message: `No student with email ${studentEmail}` });
    }
    const { acknowledged } = await accessStudent.updateOne(
      { _id: new ObjectId(isStudent._id) },
      {
        $set: {
          firstName: firstName ?? isStudent.firstName,
          lastName: lastName ?? isStudent.lastName,
          dateOfBirth: dateOfBirth ?? isStudent.dateOfBirth,
        },
      }
    );

    if (!acknowledged) {
      return res.status(500).send({ message: "Update failed !" });
    }

    res.status(200).send({ message: "Update successful" });
  } catch (error) {
    const err = error.details[0].message;
    const formattedError = err.replace(/\\/g, "").replace(/"/g, "");
    res.status(400).send({ message: formattedError });
  }
});

module.exports = router;
