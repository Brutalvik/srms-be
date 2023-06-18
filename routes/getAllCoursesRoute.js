const express = require("express");
const router = express();
const getAllCourses = require("../collections/getCourseCollection");

router.get("/courses", async (req, res) => {
  try {
    const accessCourse = await getAllCourses();
    const courseData = await accessCourse.find({}).toArray();
    res.status(200).send(courseData);
  } catch (error) {
    res.status(400).send({
      message: "Unable to fetch course data",
    });
  }
});

module.exports = router;
