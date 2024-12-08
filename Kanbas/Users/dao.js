
import model from "./model.js";
// import db from "../Database/index.js";

// let { users } = db;

export const createUser = (user) => {
  delete user._id
  return model.create(user);
}


export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) => model.findOne({ username: username });
export const findUserByCredentials = (username, password) => model.findOne({ username, password });
export const findUsersByRole = (role) => model.find({ role: role });
export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });

export const deleteUser = (userId) => model.deleteOne({ _id: userId });


export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};

// DOESNT WORK: 1:45 12/8
export const findUserRoleByID = async (userID) => {
  console.log("UD: ***NEW*** FINDING ROLE FOR USER: " + userID)
  const userRole = await model.findOne({_id : userID}).select("role")
  console.log("UD: found user role: " + userRole)
  return userRole
}


// todo: change this shit *****
export function findAllCourses() {
  return Database.courses;
}

