import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customError.js";
import { comparePassword } from "../utils/passwordUtils.js";

//npm i --save-dev @types/bcryptjs: uninstall
export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  req.body.password = await hashPassword(req.body.password);

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new UnauthenticatedError("invalid credentials");

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

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
