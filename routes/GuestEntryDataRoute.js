import express from "express";
import authenticateToken from "../middleware/verifyToken.js";
import { GetActiveUsersCount, GuestEntry, GuestEntryUsersData } from "../controller/GuestEntryDataController.js";

const GetGuestEntryRoute = express.Router();

GetGuestEntryRoute.get("/guest-entries", authenticateToken, GuestEntry);
GetGuestEntryRoute.get("/guest-entries-data", authenticateToken, GuestEntryUsersData);
GetGuestEntryRoute.get("/guest-active-users", authenticateToken, GetActiveUsersCount);

export default GetGuestEntryRoute;