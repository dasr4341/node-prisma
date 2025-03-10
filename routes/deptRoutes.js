import { Router } from "express";
import {
    addDept
} from '../controller/deptController.js';

const router = Router();
router.post('/', addDept)

export default router;