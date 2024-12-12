
import model from "./model.js";

// FETCH FUNCTIONS //

export function findAllGrades() {
  return model.find();
}

export function findQuizGradesForUser(quizID, userID) {
  const grades = model.findOne({ user: userID, quiz: quizID })
  return grades;
}

export function existsQuizGradesForUser(quizID, userID) {
  const gradesExists = model.exists({ user: userID, quiz: quizID })
  return gradesExists;
}

//   

export function createGrade(grade) {
  delete grade._id;
  return model.create(grade);
}

export function deleteGrade(gradeID) {
  return model.deleteOne({ _id: gradeID });
}

export function updateGradeByID(gradeID, updatedGrade) {
  return model.updateOne({ _id: gradeID }, { $set: updatedGrade });
}

