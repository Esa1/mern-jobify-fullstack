import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";

export const register = async (req, res) => {
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

export const login = async (req, res) => {
  res.send("login");
  //   const user = await User.create(req.body);
  //   res.status(StatusCodes.CREATED).json({ user });
};
// export const getAllUsers = async (req, res) => {
//   const users = await User.find({});
//   res.status(StatusCodes.OK).json({ users });
// };

// export const getUser = async (req, res) => {
//   const user = await User.findById(req.params.name);
//   res.status(StatusCodes.OK).json({ user });
// };
