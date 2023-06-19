const express = require("express");
const router = express();
const getAllCourses = require("../collections/getCourseCollection");
const { ObjectId } = require("mongodb");
const { deleteCourseSchema } = require("../schema/validation");

router.delete("/deletecourse", async (req, res) => {
  const { id } = req.query;

  const accessCourses = await getAllCourses();
  try {
    await deleteCourseSchema.validateAsync({
      id,
    });
    const courseExists = await accessCourses.findOne({
      _id: new ObjectId(id),
    });

    if (!courseExists) {
      return res.status(404).send({ message: `Course does not exist !` });
    }

    const { acknowledged } = await accessCourses.deleteOne({
      _id: new ObjectId(id),
    });

    if (!acknowledged) {
      return res.status(500).send({ message: "Cannot delete course !" });
    }
    const courses = await accessCourses.find({}).toArray();
    res.status(200).send({ message: "Course deleted !", data: courses });
  } catch (error) {
    const err = error.details[0].message;
    const formattedError = err.replace(/\\/g, "").replace(/"/g, "");
    res.status(400).send({ message: formattedError });
  }
});

module.exports = router;
