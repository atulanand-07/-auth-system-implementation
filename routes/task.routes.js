import express from "express";
import { addTask, fetchTask } from "../controllers/task.controller.js";
import { validateSession } from "../middlewares/session.middleware.js";

const router = express.Router();


router.post("/", validateSession, addTask)
router.get("/", validateSession, fetchTask)



export default router