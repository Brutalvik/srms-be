const express = require("express");
const router = express();
const getAllCourses = require("../collections/getCourseCollection");
const { postCourseSchema } = require("../schema/validation");

router.post("/addcourse", async (req, res) => {
  try {
    await postCourseSchema.validateAsync(req.body);
    const newCourse = req.body;

    const accessCourse = await getAllCourses();

    const courseExists = await accessCourse.findOne({
      courseName: newCourse.courseName.trim().toLowerCase(),
    });

    if (courseExists) {
      return res.status(409).send({
        message: `Course ${newCourse.courseName} already exists !`,
      });
    }

    const postNewCourse = await accessCourse.insertOne({
      courseName: newCourse.courseName.trim().toLowerCase(),
    });

    if (!postNewCourse.acknowledged) {
      res.status(500).send({ message: "Internal server error" });
    }
    res.status(200).send({
      message: `Course ${newCourse.courseName} added successfully`,
    });
  } catch (error) {
    const err = error.details[0].message;
    const formattedError = err.replace(/\\/g, "").replace(/"/g, "");
    res.status(400).send({ message: formattedError });
  }
});

module.exports = router;
