import express from "express";
import authenticateToken from "../middleware/verifyToken.js";
import { DanceStudioUsersData } from "../controller/DanceStudioDataController.js";

const GetDanceStudioRoute = express.Router();

GetDanceStudioRoute.get("/dance-studio-users", authenticateToken, DanceStudioUsersData);

export default GetDanceStudioRoute;