const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./logger/logger");
const getAllStudents = require("./routes/getAllStudentsRoute");
const postNewStudent = require("./routes/postNewStudentRoute");
const upsertStudent = require("./routes/upsertStudentRoute");
const deleteStudent = require("./routes/deleteStudentRoute");
const addCourse = require("./routes/postNewCourseRoute");
const courses = require("./routes/getAllCoursesRoute");
const upsertCourse = require("./routes/upsertCourseRoute");
const deleteCourse = require("./routes/deleteCourseRoute");

const PORT = 5000 || process.env.PORT;
app.use(cors());

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Logger
app.use(logger);

app.use("/api", getAllStudents);
app.use("/api", postNewStudent);
app.use("/api", upsertStudent);
app.use("/api", deleteStudent);
app.use("/api", courses);
app.use("/api", addCourse);
app.use("/api", upsertCourse);
app.use("/api", deleteCourse);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
