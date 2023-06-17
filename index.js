const express = require("express");
const app = express();
const getAllStudents = require("./routes/getAllStudentsRoute");
const postNewStudent = require("./routes/postStudentRoute");
const upsertStudent = require("./routes/upsertStudentRoute");
const deleteStudent = require("./routes/deleteStudentRoute");

const PORT = 5000 || process.env.PORT;

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", getAllStudents);
app.use("/api", postNewStudent);
app.use("/api", upsertStudent);
app.use("/api", deleteStudent);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
