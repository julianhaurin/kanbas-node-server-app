
import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
    name: { type: String, default: "Quiz Name" },
    description: { type: String, default: "Quiz Description" },
    
    published: { type: Boolean, default: false },
    
    // Quiz Metadata (from assignment doc)
    type: {
      type: String,
      enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
      default: "Graded Quiz",
    },
    points: Number,
    group: {
      type: String,
      enum: ["Quizzes", "Exams", "Assignments", "Project"],
      default: "Quizzes",
    },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimitMins: { type: Number, default: 20 },
    hasMultipleAttempts: { type: Boolean, default: false },
    numAttempts: { type: Number, default: 1 },
    showCorrectAnswers: { type: Boolean, default: false }, // is slightly different, fix *****
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: { type: Boolean, default: true },
    isWebcamRequired: { type: Boolean, default: true },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    
    dueDate: String,
    availableDate: String,
    untilDate: String,
    
    // Quiz Questions
    questions: [
      {
        questionID : { type: String, default: "" },
        questionTitle: { type: String, default: "Question Title" },
        questionPoints: { type: Number, default: 0 },
        questionDescription: { type: String, default: "Question Description"},
        
        questionType: {
          type: String,
          enum: ["Multiple Choice", "True False", "Fill In The Blank"],
          default: "Multiple Choice",
        },
        
        mc_choices: [
          {
            choiceDescription: String,
            choiceID: String,
          }
        ],
        
        mc_answerIdx: { type: Number, default: 0 },
        mc_answerID: String, // fix this shit *****
        tf_answer: { type: Boolean, default : true },
        fitb_answers: [
          {
            fitbAnswer: String,
            fitbID: String,
          }
        ]
        
      }
    ]
    
  },
  { collection: "quizzes" }
);

export default quizSchema;





// SAMPLE
// {
//   "_id": {
//     "$oid": "675552322d73c107842f19aa"
//   },
//   "course": {
//     "$oid": "675517042d73c107842f1957"
//   },
//   "name": "test quiz 1",
//   "published": true,
//   "type": "Graded Quiz",
//   "points": 25,
//   "group": "Exams",
//   "shuffleAnswrs": true,
//   "timeLimitMins": 30,
//   "hasMultipleAttempts": true,
//   "numAttempts": 3,
//   "showCorrectAnswers": true,
//   "accessCode": "password",
//   "oneQuestionAtATime": true,
//   "isWebcamRequired": true,
//   "lockQuestionsAfterAnswering": false,
//   "dueDate": "Dec13",
//   "availableDate": "Dec10",
//   "untilDate": "Dec14",
//   "questions": [
//     {
//       "questionTitle": "test question 1 title",
//       "questionPoints": 5,
//       "questionDescription": "test question 1 description",
//       "questionType": "Multiple Choice",
//       "choices": [
//         "choice 1",
//         "choice 2",
//         "choice 3"
//       ],
//       "correctAnswer": 1
//     }
//   ]
// }