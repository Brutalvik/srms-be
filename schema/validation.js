const Joi = require("joi");

const postStudentSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  dateOfBirth: Joi.string().required(),
});

const deleteStudentSchema = Joi.object({
  id: Joi.string().required(),
});

const upsertStudentSchema = Joi.object({
  firstName: Joi.string().min(3).max(30),
  lastName: Joi.string().min(3).max(30),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  dateOfBirth: Joi.string(),
});

const postCourseSchema = Joi.object({
  courseName: Joi.string().min(3).max(30).required(),
});

const deleteCourseSchema = Joi.object({ id: Joi.string().required() });

const postResultsSchema = Joi.object({
  studentName: Joi.string().required(),
  studentId: Joi.string(),
  courseName: Joi.string().required(),
  courseId: Joi.string(),
  grade: Joi.string().required(),
});

module.exports = {
  postStudentSchema,
  upsertStudentSchema,
  deleteStudentSchema,
  postCourseSchema,
  deleteCourseSchema,
  postResultsSchema,
};
