
import * as gradesDAO from "./dao.js";
// import * as modulesDAO from "../Modules/dao.js";
// import * as assignmentsDAO from "../Assignments/dao.js";
// import * as enrollmentsDAO from "../Enrollments/dao.js";

export default function GradeRoutes(app) {
  
  app.get("/api/grades", async (req, res) => {
    const grades = await gradesDAO.findAllGrades();
    res.send(grades);
  });
  
  app.get("/api/grades/quizzes/:qid/:uid", async (req, res) => {
    const { qid, uid } = req.params;
    const grades = await gradesDAO.findQuizGradesForUser(qid, uid);
    res.send(grades);
  });
  
  app.get("/api/grades/quizzes/exists/:qid/:uid", async (req, res) => {
    const { qid, uid } = req.params;
    const grades = await gradesDAO.existsQuizGradesForUser(qid, uid);
    res.send(grades);
  });
  
  // PUT REQUESTS //

  app.put("/api/grades/:gid", async (req, res) => {
    const { gid } = req.params;
    const updatedGrade = req.body;
    const status = await gradesDAO.updateGradeByID(gid, updatedGrade);
    res.send(status);
  });
  
  // POST REQUESTS //
  
  app.post("/api/grades", async (req, res) => {
    const grade = await gradesDAO.createGrade(req.body);
    res.json(grade);
  });
  
  // DELETE REQUESTS //
  
  app.delete("/api/grades/:gid", async (req, res) => {
    const { gid } = req.params;
    const status = await gradesDAO.deleteQuiz(gid);
    res.send(status);
  });
  
}