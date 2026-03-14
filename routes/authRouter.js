import { Router } from "express";
const router = Router();
import {
  register,
  login,
  // getAllUsers,
  // getUser,
  // createUser,
} from "../controllers/authController.js";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../middleware/validationMiddleware.js";
router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);
// router.route("/").post(register).post(login);
// router.route("/").get(getAllUsers).post(createUser);
// router.route("/:name").get(getUser);

export default router;
