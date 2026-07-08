import express from "express";
import authenticateToken from "../middleware/verifyToken.js";
import { GetActiveUsersCount, GetUsers, MechanicInvoicesData, MechanicServicesData } from "../controller/RGMechanicDataController.js";

const GetRGMechanicRoute = express.Router();

GetRGMechanicRoute.get("/get-rg-mechanic-users", authenticateToken, GetUsers);
GetRGMechanicRoute.get("/rg-mechanic-active-users", authenticateToken, GetActiveUsersCount);
GetRGMechanicRoute.get("/rg-mechanic-services-data", authenticateToken, MechanicServicesData);
GetRGMechanicRoute.get("/rg-mechanic-invoices-data", authenticateToken, MechanicInvoicesData);

export default GetRGMechanicRoute;