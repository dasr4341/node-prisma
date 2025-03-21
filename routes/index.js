import { Router } from "express";
import UserRoutes from "./userRoutes.js";
import DeptRoutes from "./deptRoutes.js";
// import PostRoutes from "./postRoute.js";
// import CommentRoutes from "./commentRoutes.js";

const router = Router();

router.use("/api/user", UserRoutes);
router.use("/api/dept", DeptRoutes);

// * For Post Routes
// router.use("/api/post", PostRoutes);

// // * For Post Routes
// router.use("/api/comment", CommentRoutes);

export default router;