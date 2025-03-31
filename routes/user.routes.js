import { Router } from "express";
import { createUser, updateUser, fetchUser, deleteUser } from "../controller/user.controller.js";

const router = Router();

router.post('/', createUser);
router.get('/', fetchUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
