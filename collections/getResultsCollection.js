const mongoConnection = require("../db/config");

const getAllResults = async () => {
  const connection = await mongoConnection();
  const resultsCollection = connection.collection("results");
  return resultsCollection;
};

module.exports = getAllResults;
