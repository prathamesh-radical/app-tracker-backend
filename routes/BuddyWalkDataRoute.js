import express from "express";
import authenticateToken from "../middleware/verifyToken.js";
import { GetGroupData, GetGroupMemberData, GetUsersData, GetUsersStepsData } from "../controller/BuddyWalkDataController.js";

const GetBuddyWalkRoute = express.Router();

GetBuddyWalkRoute.get("/buddy-walk-steps", authenticateToken, GetUsersData);
GetBuddyWalkRoute.get("/get-group-data", authenticateToken, GetGroupData);
GetBuddyWalkRoute.get("/get-group-member-data", authenticateToken, GetGroupMemberData);
GetBuddyWalkRoute.get("/user-steps", authenticateToken, GetUsersStepsData);

export default GetBuddyWalkRoute;