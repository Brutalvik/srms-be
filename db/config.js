require("dotenv").config();

const mongodb = require("mongodb");
const MongoClient = new mongodb.MongoClient(process.env.DBURL);

const mongoConnection = async () => {
  console.log("Accessing db...");
  try {
    await MongoClient.connect();
    console.log("Access to DB granted");
    const db = MongoClient.db("srms");
    return db;
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoConnection;
