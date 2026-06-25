import express from "express";
import authenticateToken from "../middleware/verifyToken.js";
import { GetActiveUsersCount, GetUsers } from "../controller/RGMechanicDataController.js";

const GetRGMechanicRoute = express.Router();

GetRGMechanicRoute.get("/get-rg-mechanic-users", authenticateToken, GetUsers);
GetRGMechanicRoute.get("/rg-mechanic-active-users", authenticateToken, GetActiveUsersCount);

export default GetRGMechanicRoute;