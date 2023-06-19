const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./logger/logger");
const getStudents = require("./routes/getAllStudentsRoute");
const postNewStudent = require("./routes/postNewStudentRoute");
const upsertStudent = require("./routes/upsertStudentRoute");
const deleteStudent = require("./routes/deleteStudentRoute");
const getCourses = require("./routes/getAllCoursesRoute");
const postNewCourse = require("./routes/postNewCourseRoute");
const upsertCourse = require("./routes/upsertCourseRoute");
const deleteCourse = require("./routes/deleteCourseRoute");
const getResults = require("./routes/getAllResultsRoute");
const postNewResult = require("./routes/postNewResultsRoute");

const PORT = 5000 || process.env.PORT;
app.use(cors());

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Logger
app.use(logger);

app.use("/api", getStudents);
app.use("/api", postNewStudent);
app.use("/api", upsertStudent);
app.use("/api", deleteStudent);
app.use("/api", getCourses);
app.use("/api", postNewCourse);
app.use("/api", upsertCourse);
app.use("/api", deleteCourse);
app.use("/api", getResults);
app.use("/api", postNewResult);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
