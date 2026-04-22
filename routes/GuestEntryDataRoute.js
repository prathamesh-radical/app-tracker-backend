import express from "express";
import authenticateToken from "../middleware/verifyToken.js";
import { GuestEntry, GuestEntryUsersData } from "../controller/GuestEntryDataController.js";

const GetGuestEntryRoute = express.Router();

GetGuestEntryRoute.get("/guest-entries", authenticateToken, GuestEntry);
GetGuestEntryRoute.get("/guest-entries-data", authenticateToken, GuestEntryUsersData);

export default GetGuestEntryRoute;