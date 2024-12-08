
import model from "./model.js";
import coursesModel from "../Courses/model.js"

export async function findCoursesForUser(userId) {
  console.log("DB: FINDING COURSES FOR USER WITH ID: " + userId)
  
  // Still cant get this working 2:06 12/8, gonna try workaround (below commented shit)
  // const enrollmentsTEST = await model.find({ user: userId })
  // const enrollments = await model.find({ user: userId }).populate("course");
  // return enrollments.map((enrollment) => enrollment.course);
  // console.log("DB: FOUND ***TEST*** ENROLLMENTS FOR USER WITH ID: " + userId + " : " + JSON.stringify(enrollmentsTEST))
  
  const enrollments = await model.find({ user: userId });
    
  if (!enrollments.length) {
    console.log("DB: NO ENROLLMENTS FOUND FOR USER WITH ID: " + userId)
    return [];
  }
  
  const courseIds = enrollments.map((enrollment) => enrollment.course);
  console.log("DB: courses IDs for user " + userId + ": " + courseIds)
  const courses = await coursesModel.find({ _id: { $in: courseIds } });
  console.log("DB: courses found: " + courses)
  return courses
  
}

export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
}

export function enrollUserInCourse(user, course) {
  return model.create({ user, course });
}

export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}



