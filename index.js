const express = require("express");
const app = express();

const PORT = 5000 || process.env.PORT;

const DBURL =
  "mongodb+srv://expressadmin:XGoH5CZ2Hl9D4sd3@cluster0.799xhnc.mongodb.net/";

const mongodb = require("mongodb");
const MongoClient = new mongodb.MongoClient(DBURL);

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoConnection = async () => {
  try {
    await MongoClient.connect();
    console.log("Connected to MongoDB");
    const db = MongoClient.db("srms");
    return db;
  } catch (error) {
    console.log(error);
  }
};

app.get("/students", async (req, res) => {
  try {
    const studentCollection = await mongoConnection();
    const students = studentCollection.collection("students");
    const studentData = await students.find({}).toArray();
    res.status(200).send(studentData);
  } catch (error) {
    res.status(400).send({
      message: "Unable to fetch student data",
    });
  }
});

app.post("/addstudent", async (req, res) => {
  if (!req.body.firstName || req.body.firstName === "") {
    return res.status(400).send({ message: "First name required !" });
  }
  if (!req.body.lastName || req.body.lastName === "") {
    return res.status(400).send({ message: "Last name required !" });
  }
  if (!req.body.email || req.body.email === "") {
    return res.status(400).send({ message: "Email required !" });
  }
  if (!req.body.dateOfBirth || req.body.dateOfBirth === "") {
    return res.status(400).send({ message: "Date of birth required !" });
  }

  try {
    const addstudent = req.body;
    const studentCollection = await mongoConnection();
    const student = studentCollection.collection("students");
    const postStudentData = await student.insertOne(addstudent);

    if (postStudentData.acknowledged) {
      res.status(200).send({
        message: `Student ${req.body.email} registered successfully`,
      });
    }
  } catch (error) {
    res.status(400).send({ message: "Unable to register student" });
  }
});

app.put("/updateemail", async (req, res) => {
  const updatedEmail = req.body.updatedEmail;
  const studentEmail = req.body.email;
  const studentCollection = await mongoConnection();
  const student = studentCollection.collection("students");
  const isStudent = await student.findOne({ email: studentEmail });
  if (isStudent === null) {
    return res
      .status(404)
      .send({ message: `No student with email ${studentEmail}` });
  }
  const { acknowledged } = await student.updateOne(
    { _id: isStudent._id },
    { $set: { email: updatedEmail } }
  );

  if (!acknowledged) {
    return res.status(500).send({ message: "Update failed !" });
  }
  res.status(200).send({ message: "Email updated successfully" });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
