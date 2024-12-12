
import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema(
 {
   quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizModel" },
   user:   { type: mongoose.Schema.Types.ObjectId, ref: "UserModel"   },
   
   answers: [
    {
      questionID: String,
      questionType: {
        type: String,
        enum: ["Multiple Choice", "True False", "Fill In The Blank"],
        default: "Multiple Choice",
      },
      
      mc_answerIdx: { type: Number, default: 0 },
      mc_answerID: { type: String, default : ""},
      tf_answer: { type: Boolean, default: false },
      fitb_answer: { type: String, default: ""}
      
    }
   ],
   
   grade: { type : Number, default : 0 },
   attempts: { type : Number, default : 0 },
   
 },
 { collection: "grades" }
);

export default gradeSchema;

// SAMPLE
// {
//   "_id": {
//     "$oid": "675639c52d73c107842f19b1"
//   },
//   "quiz": {
//     "$oid": "675552322d73c107842f19aa"
//   },
//   "user": {
//     "$oid": "675516f72d73c107842f1954"
//   },
//   "answers": [
//     {
//       "questionID": "67560e9afaac8e61001065cf",
//       "questionType": "Multiple Choice",
//       "mc_answerIdx": 0,
//       "tf_answer": false,
//       "fitb_answer": ""
//     }
//   ],
//   "grade": 0,
//   "attempts": 0
// }
//

