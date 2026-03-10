import express from "express";
import {
    Debtors, GuestEntry, GuestEntryUsersData, Mechanic, MechanicServicesData, MechanicUsersData, Moneycollect, MoneycollectUsersData
} from "../controller/GetDataController.js";
import authenticateToken from "../middleware/verifyToken.js";

const GetRoutes = express.Router();

GetRoutes.get("/debtors", authenticateToken, Debtors);
GetRoutes.get("/mechanic", authenticateToken, Mechanic);
GetRoutes.get("/mechanic-data", authenticateToken, MechanicUsersData);
GetRoutes.get("/mechanic-services-data", authenticateToken, MechanicServicesData);
GetRoutes.get("/money-collect", authenticateToken, Moneycollect);
GetRoutes.get("/money-collect-data", authenticateToken, MoneycollectUsersData);
GetRoutes.get("/guest-entries", authenticateToken, GuestEntry);
GetRoutes.get("/guest-entries-data", authenticateToken, GuestEntryUsersData);

export default GetRoutes;