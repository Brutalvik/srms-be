const express = require("express");
const app = express();
const getAllStudents = require("./routes/getAllStudentsRoute");
const postNewStudent = require("./routes/postStudentRoute");
const upsertStudent = require("./routes/upsertStudentRoute");
const deleteStudent = require("./routes/deleteStudentRoute");
const addCourse = require("./routes/postNewCourseRoute");
const courses = require("./routes/getAllCoursesRoute");
const upsertCourse = require("./routes/upsertCourseRoute");

const PORT = 5000 || process.env.PORT;

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", getAllStudents);
app.use("/api", postNewStudent);
app.use("/api", upsertStudent);
app.use("/api", deleteStudent);
app.use("/api", courses);
app.use("/api", addCourse);
app.use("/api", upsertCourse);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
