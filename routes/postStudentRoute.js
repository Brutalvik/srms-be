const express = require("express");
const router = express();
const postNewStudent = require("../collections/getStudentCollection");
const Joi = require("joi");

const postStudentSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  dateOfBirth: Joi.string().required(),
});

router.post("/poststudent", async (req, res) => {
  try {
    await postStudentSchema.validateAsync(req.body);
    const newStudent = req.body;

    const upsertStudent = await postNewStudent();

    const isStudent = await upsertStudent.findOne({
      email: newStudent.email,
    });
    if (isStudent) {
      return res.status(409).send({
        message: `Student with email ${newStudent.email} already exists`,
      });
    }

    const postStudentData = await upsertStudent.insertOne(newStudent);

    if (!postStudentData.acknowledged) {
      console.log(5);
      res.status(500).send({ message: "Internal server error" });
    }
    res.status(200).send({
      message: `Student ${req.body.email} registered successfully`,
    });
  } catch (error) {
    const err = error.details[0].message;
    const formattedError = err.replace(/\\/g, "").replace(/"/g, "");
    res.status(400).send({ message: formattedError });
  }
});

module.exports = router;
