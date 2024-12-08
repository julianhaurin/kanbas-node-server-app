
import * as coursesDAO from "./dao.js";
import * as modulesDAO from "../Modules/dao.js";
import * as assignmentsDAO from "../Assignments/dao.js";
import * as enrollmentsDAO from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
  
  app.get("/api/courses", async (req, res) => {
    const courses = await coursesDAO.findAllCourses();
    res.send(courses);
  });
  
  app.post("/api/courses", async (req, res) => {
    const course = await dao.createCourse(req.body);
      
    // enroll author automatically
    const currentUser = req.session["currentUser"];
     if (currentUser) {
       await enrollmentsDAO.enrollUserInCourse(currentUser._id, course._id);
     }
      
    res.json(course);
  });
 
  
  app.delete("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const status = await coursesDAO.deleteCourse(courseId);
    res.send(status);
  });
  
  app.put("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = await coursesDAO.updateCourse(courseId, courseUpdates);
    res.send(status);
  });
  
  app.get("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const modules = await modulesDAO.findModulesForCourse(courseId);
    res.json(modules);
  });
  
  app.post("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = await modulesDAO.createModule(module);
    res.send(newModule);
  });
  
  // assignments
  
  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const assignments = await assignmentsDAO.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });
  
  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    const newModule = await assignmentsDAO.createAssignment(assignment);
    res.send(newModule);
  });

  
  
}

