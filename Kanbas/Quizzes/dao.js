
import model from "./model.js";

// FETCH FUNCTIONS //

// Retrieves all quizzes
export function findAllQuizzes() {
  return model.find();
}

//
export function findQuizByID(quizId) {
  return model.findOne({_id : quizId});
}

// 
export function findQuizzesByCourseID(courseId) {
  return model.find({course : courseId})
}

// UPDATE FUNCTIONS //

export function updateQuizByID(quizID, updatedQuiz) {
  return model.updateOne({ _id: quizID }, { $set: updatedQuiz });
}

// CREATE FUNCTIONS //

export function createQuiz(quiz) {
  delete quiz._id;
  return model.create(quiz);
}

// DELETE FUNCTIONS //

export function deleteQuiz(quizID) {
  return model.deleteOne({ _id: quizID });
}

