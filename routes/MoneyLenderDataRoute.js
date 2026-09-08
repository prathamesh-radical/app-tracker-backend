import express from "express";
import authenticateToken from "../middleware/verifyToken.js";
import { GetActiveUsersCount, Moneylender, Moneylendersettings, MoneylenderUsersData } from "../controller/MoneyLenderDataController.js";

const GetMoneyLenderRoute = express.Router();

GetMoneyLenderRoute.get("/money-lender", authenticateToken, Moneylender);
GetMoneyLenderRoute.get("/money-lender-data", authenticateToken, MoneylenderUsersData);
GetMoneyLenderRoute.get("/money-lender-active-users", authenticateToken, GetActiveUsersCount);
GetMoneyLenderRoute.get("/money-lender-settings", authenticateToken, Moneylendersettings);

export default GetMoneyLenderRoute;