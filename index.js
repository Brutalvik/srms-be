const express = require("express");
const app = express();
const getAllStudents = require("./routes/getAllStudentsRoute");
const postNewStudent = require("./routes/postStudentRoute");

const PORT = 5000 || process.env.PORT;

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", getAllStudents);
app.use("/api", postNewStudent);

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
