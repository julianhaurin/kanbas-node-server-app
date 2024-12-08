
import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

// let currentUser = null;
const CURRENT_USER_KEY = "currentUser"

export default function UserRoutes(app) {
  
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };
  
  
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  }
  
  const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    await dao.updateUser(userId, userUpdates);
    const currentUser = await dao.findUserById(userId);
    req.session[CURRENT_USER_KEY] = currentUser;
    if (currentUser && currentUser._id === userId) {
      req.session[CURRENT_USER_KEY] = { ...currentUser, ...userUpdates };
    }
    res.json(currentUser);
  };

  
  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    if (name) {
      const users = await dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }

    
    const users = await dao.findAllUsers();
    res.json(users);
  };

  
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };
  
  const findCoursesForUser = async (req, res) => {
    
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    
    if (currentUser.role === "ADMIN") {
      const courses = await courseDao.findAllCourses();
      res.json(courses);
      return;
    }
    let { uid } = req.params;
    if (uid === "current") {
      uid = currentUser._id;
    }
    console.log("* FINDING COURSES FOR USER: " + uid)
    const courses = await enrollmentsDao.findCoursesForUser(uid);
    res.json(courses);
  };
  
  
  
  
  
  
  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already in use" });
      return;
    }
    const currentUser = await dao.createUser(req.body);
    req.session[CURRENT_USER_KEY] = currentUser;
    // console.log("signing new user up, new req.session: " + JSON.stringify(req.session[CURRENT_USER_KEY]))
    res.json(currentUser);
  };
  
  const signin = async (req, res) => { 
    const { username, password } = req.body;
    // console.log("SIGNING USER IN: " + username + ":" + password)
    const currentUser = await dao.findUserByCredentials(username, password);
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
  
  // replaced by findCoursesForUser 1:27 12/8
  // const findCoursesForEnrolledUser = (req, res) => {
  //   let { userId } = req.params;
  //   console.log("1 GETTING COURSES FOR USER: " + userId)
  //   if (userId === "current") {
  //     // console.log("fetching courses for current user, current req.session: " + JSON.stringify(req.session[CURRENT_USER_KEY]))
  //     const currentUser = req.session[CURRENT_USER_KEY];
  //     if (!currentUser) {
  //       // console.log("error 401: not current user")
  //       res.sendStatus(401);
  //       return;
  //     }
  //     userId = currentUser._id;
  //   }
  //   console.log("2 GETTING COURSES FOR USER: " + userId)
  //   const courses = courseDao.findCoursesForEnrolledUser(userId);
  //   res.json(courses);
  // };
  
  const findRoleForUser = async (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session[CURRENT_USER_KEY];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const role = await dao.findUserRoleByID(userId);
    console.log("found role for user " + userId + " :" + role)
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
  
  const findUserData = async (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session[CURRENT_USER_KEY];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const userData = await dao.findUserById(userId)
    res.json(userData);
  }
  
  const createCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = await courseDao.createCourse(req.body);
    await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };
  
  const enrollUserInCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }
    const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
    res.send(status);
  };
  const unenrollUserFromCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }
    const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
    res.send(status);
  };
  
  app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
  app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);
  app.post("/api/users/current/courses", createCourse);
  // app.get("/api/users/:userId/courses", findCoursesForUser);
  app.get("/api/users/:uid/courses", findCoursesForUser);
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
  
  app.get("/api/users/:userId/data", findUserData);
  
}

