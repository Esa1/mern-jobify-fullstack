import { Router } from "express";
const router = Router();

import {
  register,
  login,
  // getAllUsers,
  // getUser,
  // createUser,
} from "../controllers/authController.js";

router.post("/register", register);
router.post("/login", login);
// router.route("/").post(register).post(login);
// router.route("/").get(getAllUsers).post(createUser);
// router.route("/:name").get(getUser);

export default router;
