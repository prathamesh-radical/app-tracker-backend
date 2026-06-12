import express from "express";
import authenticateToken from "../middleware/verifyToken.js";
import { GetActiveUsersCount, GetUsers } from "../controller/RGMechanicDataController.js";

const GetRGMechanicRoute = express.Router();

GetRGMechanicRoute.get("/get-rg-users", authenticateToken, GetUsers);
GetRGMechanicRoute.get("/rg-active-users", authenticateToken, GetActiveUsersCount);

export default GetRGMechanicRoute;