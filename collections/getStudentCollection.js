const mongoConnection = require("../db/config");

const getAllStudents = async () => {
  const connection = await mongoConnection();
  const studentCollection = connection.collection("students");
  return studentCollection;
};

module.exports = getAllStudents;
