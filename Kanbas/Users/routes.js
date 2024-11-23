
import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

// let currentUser = null;
const CURRENT_USER_KEY = "currentUser"

export default function UserRoutes(app) {

  const createUser = (req, res) => { };
  const deleteUser = (req, res) => { };
  const findAllUsers = (req, res) => { };
  const findUserById = (req, res) => { };
  
  const updateUser = (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    dao.updateUser(userId, userUpdates);
    const currentUser = dao.findUserById(userId);
    req.session[CURRENT_USER_KEY] = currentUser;
    // console.log("updated user, new req.session: " + JSON.stringify(req.session[CURRENT_USER_KEY]))
    res.json(currentUser);
  };
  
  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already in use" });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session[CURRENT_USER_KEY] = currentUser;
    // console.log("signing new user up, new req.session: " + JSON.stringify(req.session[CURRENT_USER_KEY]))
    res.json(currentUser);
  };
  
  const signin = (req, res) => { 
    const { username, password } = req.body;
    // console.log("SIGNING USER IN: " + username + ":" + password)
    const currentUser = dao.findUserByCredentials(username, password);
    if (currentUser) {
      // console.log("successfully logged user in, user: " + JSON.stringify(currentUser))
      req.session[CURRENT_USER_KEY] = currentUser;
      console.log("new req.session: " + JSON.stringify(req.session[CURRENT_USER_KEY]))
      res.json(currentUser);
    } else {
      console.log("error 401 unable to log user in")
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
    
    req.session.save() // ***
    
  };
  
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };
  
  const profile = async (req, res) => {
    // console.log("getting user profile (backend)")
    const currentUser = req.session[CURRENT_USER_KEY];
    if (!currentUser) {
      // console.log("error getting user profile (backend), not current user")
      res.sendStatus(401);
      return;
    }
    console.log("got user profile, returning")
    res.json(currentUser);
  };
  
  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      // console.log("fetching courses for current user, current req.session: " + JSON.stringify(req.session[CURRENT_USER_KEY]))
      const currentUser = req.session[CURRENT_USER_KEY];
      if (!currentUser) {
        // console.log("error 401: not current user")
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = courseDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };
  
  const findRoleForUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session[CURRENT_USER_KEY];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const role = courseDao.findRoleForUser(userId);
    // console.log("found role for user " + userId + " :" + role)
    res.json(role);
  }
  
  const findIDForUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session[CURRENT_USER_KEY];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    res.json(userId);
  }
  
  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = courseDao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };
  
  app.post("/api/users/current/courses", createCourse);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.get("/api/users/:userId/role", findRoleForUser);
  app.get("/api/users/:userId/id", findIDForUser);
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  
}

