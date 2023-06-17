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

router.put("/deletestudent", async (req, res) => {
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
        .send({ message: `No student with email ${studentEmail}` });
    }
    const { acknowledged } = await accessStudent.findOneAndDelete({
      _id: new ObjectId(isStudent._id),
    });

    if (!acknowledged) {
      return res.status(500).send({ message: "Delete failed !" });
    }

    res.status(200).send({ message: "Student deleted !" });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
