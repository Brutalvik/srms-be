const express = require("express");
const router = express();
const getAllCourses = require("../collections/getCourseCollection");
const { ObjectId } = require("mongodb");
const { postCourseSchema } = require("../schema/validation");

router.delete("/deletecourse", async (req, res) => {
  const { courseName } = req.body;
  const accessCourses = await getAllCourses();
  try {
    await postCourseSchema.validateAsync({
      courseName,
    });
    const courseExists = await accessCourses.findOne({
      courseName: courseName,
    });

    if (!courseExists) {
      return res
        .status(404)
        .send({ message: `No course with name ${courseName} exists` });
    }
    const { acknowledged } = await accessCourses.deleteOne({
      _id: new ObjectId(courseExists._id),
    });

    if (!acknowledged) {
      return res.status(500).send({ message: "Cannot delete course !" });
    }

    res.status(200).send({ message: "Course deleted !" });
  } catch (error) {
    console.log(error);
    // const err = error.details[0].message;
    // const formattedError = err.replace(/\\/g, "").replace(/"/g, "");
    // res.status(400).send({ message: formattedError });
  }
});

module.exports = router;
