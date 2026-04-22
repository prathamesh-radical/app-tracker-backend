import express from "express";
import authenticateToken from "../middleware/verifyToken.js";
import { BuddyWalkStepsData, GetGroupData, GetGroupMemberData } from "../controller/BuddyWalkDataController.js";

const GetBuddyWalkRoute = express.Router();

GetBuddyWalkRoute.get("/buddy-walk-steps", authenticateToken, BuddyWalkStepsData);
GetBuddyWalkRoute.get("/get-group-data", authenticateToken, GetGroupData);
GetBuddyWalkRoute.get("/get-group-member-data", authenticateToken, GetGroupMemberData);

export default GetBuddyWalkRoute;