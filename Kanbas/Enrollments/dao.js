
import Database from "../Database/index.js";

export function enrollUserInCourse(userId, courseId) {
  let { enrollments } = Database;
  console.log("\nenrollments: " + JSON.stringify(enrollments) + "\n")
  enrollments.push({ _id: Date.now().toString(), user: userId, course: courseId });
  Database.enrollments = enrollments
  console.log(`enrolled ${userId} in ${courseId}, new enrollments: ${JSON.stringify(Database.enrollments)}`)
}

export function unenrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  Database.enrollments = enrollments.filter(
    (enrollment) => enrollment.course !== courseId || enrollment.user !== userId
  );
}

// doesnt work ***
export function isUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  console.log("testing " + userId + " : " + courseId)
  console.log(enrollments)
  return enrollments.includes((x) => (x.user === userId && x.course === courseId))
}

