
import express from 'express';
import cors from "cors";
import session from "express-session";

import mongoose from "mongoose";

import "dotenv/config";

import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import QuizzesRoutes from "./Kanbas/Quizzes/routes.js";
import GradeRoutes from './Kanbas/Grades/routes.js';
import EnrollmentRoutes from './Kanbas/Enrollments/routes.js';

import Hello from "./hello.js"
import Lab5 from "./Lab5/index.js";

// Connect to local MondoDB
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  // NOTE: removing this fixed a session error i was having locally (currentUser was undefined after loggin in) *****
  // sessionOptions.cookie = {
  //   sameSite: "none",
  //   secure: true,
  //   domain: process.env.NODE_SERVER_DOMAIN,
  // };
}

app.use(session(sessionOptions));
app.use(express.json());

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
QuizzesRoutes(app);
GradeRoutes(app);
EnrollmentRoutes(app);

Hello(app);
Lab5(app);

app.listen(process.env.PORT || 4000)
