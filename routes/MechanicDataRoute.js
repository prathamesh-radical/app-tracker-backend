import express from "express";
import authenticateToken from "../middleware/verifyToken.js";
import {
    GetActiveUsersCount, GetAllSubscriptions, Mechanic, MechanicServicesData, MechanicSubscriptionData, MechanicUsersData, GetAllSubscriptionsByOrderIds
} from "../controller/MechanicDataController.js";

const GetMechanicRoute = express.Router();

GetMechanicRoute.get("/mechanic", authenticateToken, Mechanic);
GetMechanicRoute.get("/mechanic-data", authenticateToken, MechanicUsersData);
GetMechanicRoute.get("/mechanic-services-data", authenticateToken, MechanicServicesData);
GetMechanicRoute.get("/mechanic-active-users", authenticateToken, GetActiveUsersCount);
GetMechanicRoute.get("/mechanic-premium-users", authenticateToken, MechanicSubscriptionData);
GetMechanicRoute.get("/all-subscriptions", authenticateToken, GetAllSubscriptions);
GetMechanicRoute.post("/bulk-subscriptions", authenticateToken, GetAllSubscriptionsByOrderIds);

export default GetMechanicRoute;