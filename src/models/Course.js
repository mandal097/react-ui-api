const mongoose = require("mongoose");
const { Schema } = mongoose;

const SyllabusSchema = new Schema({
  week: { type: Number, required: true },
  topic: { type: String, required: true },
  content: { type: String, required: true },
});

const CourseSchema = new Schema({
  name: { type: String, required: true },
  instructor: { type: String, required: true },
  description: { type: String, required: true },
  enrollmentStatus: { type: String, required: true },
  thumbnail: { type: String, required: true },
  duration: { type: String, required: true },
  schedule: { type: String, required: true },
  location: { type: String, required: true },
  prerequisites: { type: [String], required: true },
  syllabus: { type: [SyllabusSchema], required: true },
  students: [
    {
      type: {
        id: { type: String },
        name: { type: String },
        email: { type: String },
        progress: {
          type: Number,
          min: 0,
          max: 100,
          default: 0,
        },
        dueDate: {
          type: Date,
        },
      },
    },
  ],
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
