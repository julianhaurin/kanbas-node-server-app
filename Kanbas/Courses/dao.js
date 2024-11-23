
import Database from "../Database/index.js";

export function findAllCourses() {
  return Database.courses;
}

export function findCoursesForEnrolledUser(userId) {
  const { courses, enrollments } = Database;
  const enrolledCourses = courses.filter((course) =>
    Array.from(enrollments).some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
    
  // console.log("got enrolled courses: " + enrolledCourses + " len: " + enrolledCourses.length)
    
  return enrolledCourses;
}

export function findRoleForUser(userId) {
  const { users } = Database;
  const roleIndex = users.findIndex(u => u._id === userId)
  
  let userRole = ""
  if (roleIndex != -1) { userRole = users[roleIndex].role }
  
  return userRole;
}

export function createCourse(course) {
  const newCourse = { ...course, _id: Date.now().toString() };
  Database.courses = [...Database.courses, newCourse];
  return newCourse;
}

export function deleteCourse(courseId) {
  const { courses, enrollments } = Database;
  Database.courses = courses.filter((course) => course._id !== courseId);
  Database.enrollments = enrollments.filter(
    (enrollment) => enrollment.course !== courseId
);}

export function updateCourse(courseId, courseUpdates) {
  const { courses } = Database;
  const course = courses.find((course) => course._id === courseId);
  if (course) { Object.assign(course, courseUpdates); }
  else { console.error("unable to update course, course with id " + courseId + " DNE") }
  return course;
}





