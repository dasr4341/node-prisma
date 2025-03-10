import { Router } from "express";
import {
  createEmp,
  updateUser,
  fetchAllUsers,
  showUser,
  deleteUser,
  getEmployeesByFilter
} from "../controller/userController.js";

const router = Router();

router.get("/filter", getEmployeesByFilter);
router.get("/", fetchAllUsers);
router.get("/:id", showUser);
router.post("/", createEmp);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;