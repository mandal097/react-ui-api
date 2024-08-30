const Course = require("../../../models/Course");
const auth = require("../../../middleware/auth");

const router = require("express").Router();

router.get("/get-course/:courseId?", async (req, res) => {
  const { courseId } = req.params;
  let course;
  try {
    if (courseId) course = await Course.findById(courseId);
    else course = await Course.find();
    res.status(200).json({
      status: "success",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      status: "err",
      message: "Something went wrong",
    });
  }
});

router.put("/enroll-course/:courseId", auth, async (req, res) => {
  const { courseId } = req.params;
  const { payload } = req;
  const { progress, dueDate, markCompletion } = req.body;
  const newStudent = { ...payload, progress, dueDate };

  try {
    const course = await Course.findOne({ _id: courseId });
    if (!course) {
      return res.json({
        status: "err",
        message: "Course not found",
      });
    }

    if (markCompletion) {
       await Course.findOneAndUpdate(
        {
          _id: courseId,
          'students.id': payload.id 
        },
        { $set: { 'students.$.progress': 100 } },
        { new: true }
      );
      return res.json({
        status: "success",
        message: "You marked this completed",
      });
    }

    const isStudentPresent = course.students.some(
      (student) => student.id === newStudent.id
    );
    if (isStudentPresent) {
      return res.json({
        status: "err",
        message: "You have already enrolled this course",
      });
    }

    course.students.push(newStudent);
    await course.save();
    res.status(200).json({
      status: "success",
      message: "Enrolled successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "err",
      message: "Something went wrong",
    });
  }
});

router.get("/enrolled-courses", auth, async (req, res) => {
  const studentId = req.payload.id;
  try {
    const enrolledCourses = await Course.find({
      students: {
        $elemMatch: { id: studentId },
      },
    });
    res.status(200).json({
      status: "success",
      data: enrolledCourses,
    });
  } catch (error) {
    res.status(500).json({
      status: "err",
      message: "Something went wrong",
    });
  }
});

router.post("/add-courses", async (req, res) => {
  try {
    const courses = req.body;
    await Course.insertMany(courses);
    res
      .status(201)
      .send({ status: "success", message: "Courses inserted successfully" });
  } catch (error) {
    res.status(500).json({
      status: "err",
      message: "Something went wrong",
    });
  }
});

module.exports = router;
