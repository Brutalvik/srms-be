const express = require("express");
const router = express();
const upsertStudent = require("../collections/getStudentCollection");
const Joi = require("joi");
const { ObjectId } = require("mongodb");

const studentSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

router.delete("/deletestudent", async (req, res) => {
  const { email } = req.body;
  const accessStudent = await upsertStudent();
  try {
    await studentSchema.validateAsync({
      email,
    });
    const isStudent = await accessStudent.findOne({ email: email });
    if (isStudent === null) {
      return res
        .status(404)
        .send({ message: `No student with email ${email}` });
    }
    const { acknowledged } = await accessStudent.deleteOne({
      _id: new ObjectId(isStudent._id),
    });

    if (!acknowledged) {
      return res.status(500).send({ message: "Cannot delete student !" });
    }

    res.status(200).send({ message: "Student deleted !" });
  } catch (error) {
    const err = error.details[0].message;
    const formattedError = err.replace(/\\/g, "").replace(/"/g, "");
    res.status(400).send({ message: formattedError });
  }
});

module.exports = router;
