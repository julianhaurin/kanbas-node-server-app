
import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
 {
   quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizModel" },
   user:   { type: mongoose.Schema.Types.ObjectId, ref: "UserModel"   },
   grade: Number,
   attempts: Number,
 },
 { collection: "enrollments" }
);

export default enrollmentSchema;
