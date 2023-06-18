const mongoConnection = require("../db/config");

const getAllCourses = async () => {
  const connection = await mongoConnection();
  const courseCollection = connection.collection("courses");
  return courseCollection;
};

module.exports = getAllCourses;
