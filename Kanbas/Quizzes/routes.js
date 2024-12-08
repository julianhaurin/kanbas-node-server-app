import * as quizzesDAO from "./dao.js";

export default function CourseRoutes(app) {
  
  // GET REQUESTS //
  
  // Get all quizzes
  app.get("/api/quizzes", async (req, res) => {
    const quizzes = await quizzesDAO.findAllQuizzes();
    res.send(quizzes);
  });
  
  // Get all quizzes from specified course
  app.get("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const quiz = await quizzesDAO.findQuizByID(quizId);
    res.send(quiz);
  });
  
  // Get all quizzes from specified course
  app.get("/api/quizzes/course/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const quizzes = await quizzesDAO.findQuizzesByCourseID(courseId);
    res.send(quizzes);
  });
  
  // PUT REQUESTS //
  
  app.put("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const updatedQuiz = req.body;
    const status = await quizzesDAO.updateQuizByID(quizId, updatedQuiz);
    res.send(status);
  });
  
  // POST REQUESTS //
  
  app.post("/api/quizzes", async (req, res) => {
    const quiz = await quizzesDAO.createQuiz(req.body);
    res.json(quiz);
  });
  
  // DELETE REQUESTS //
  
  app.delete("/api/quiz/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const status = await quizzesDAO.deleteQuiz(quizId);
    res.send(status);
  });
  
}