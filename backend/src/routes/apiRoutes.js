import express from "express";
const router = express.Router();
import { getApiRoutes } from "../controllers/apiController.js";
import {  createApiRoutes} from "../controllers/apiController.js";
import { updateApiRoutes} from "../controllers/apiController.js";
import { deleteApiRoutes} from "../controllers/apiController.js";
import { getSingleNote } from "../controllers/apiController.js";


export default router;
// Example route definitions
// Define your API routes here
router.get("/", getApiRoutes);
router.post("/", createApiRoutes);
router.put("/:id",updateApiRoutes);//through id same as this we can make for above
router.delete("/:id", deleteApiRoutes);

// Add this route BEFORE the PUT and DELETE routes
router.get("/:id", getSingleNote);