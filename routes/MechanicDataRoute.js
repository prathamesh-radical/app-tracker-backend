import express from "express";
import authenticateToken from "../middleware/verifyToken.js";
import { GetActiveUsersCount, Mechanic, MechanicServicesData, MechanicUsersData } from "../controller/MechanicDataController.js";

const GetMechanicRoute = express.Router();

GetMechanicRoute.get("/mechanic", authenticateToken, Mechanic);
GetMechanicRoute.get("/mechanic-data", authenticateToken, MechanicUsersData);
GetMechanicRoute.get("/mechanic-services-data", authenticateToken, MechanicServicesData);
GetMechanicRoute.get("/mechanic-active-users", authenticateToken, GetActiveUsersCount);

export default GetMechanicRoute;