const express = require("express");
const router = express();
const { ObjectId } = require("mongodb");
const getAllCourses = require("../collections/getCourseCollection");
const { postCourseSchema } = require("../schema/validation");

router.put("/updatecourse", async (req, res) => {
  const { courseName, newCourseName } = req.body;
  const accessCourses = await getAllCourses();
  try {
    await postCourseSchema.validateAsync({
      courseName,
    });
    const courseExists = await accessCourses.findOne({
      courseName: courseName.trim().toLowerCase(),
    });
    if (!courseExists) {
      return res
        .status(404)
        .send({ message: `No course with course name ${courseName} exists` });
    }
    const { acknowledged } = await accessCourses.updateOne(
      { _id: new ObjectId(courseExists._id) },
      {
        $set: {
          courseName:
            newCourseName.trim().toLowerCase() ?? courseExists.courseName,
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
