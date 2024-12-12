
import * as enrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {
  
  app.delete("/api/enrollments/:userId/:courseId", async (req, res) => {
    const { userId, courseId } = req.params;
    const status = await enrollmentsDao.unenrollUserFromCourse(userId, courseId);
    res.send(status);
  });
 
  app.put("/api/enrollments/:userId/:courseId", async (req, res) => {
    const { userId, courseId } = req.params;
    const status = await enrollmentsDao.enrollUserInCourse(userId, courseId);
    res.send(status);
  });
  
  app.get("/api/enrollments/:userId/:courseId", async (req, res) => {
    const { userId, courseId } = req.params;
    const status = await enrollmentsDao.isUserInCourse(userId, courseId)
    res.send(status);
  });
  
}