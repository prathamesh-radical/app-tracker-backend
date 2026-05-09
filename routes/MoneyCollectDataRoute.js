import express from "express";
import authenticateToken from "../middleware/verifyToken.js";
import { GetActiveUsersCount, Moneycollect, MoneycollectUsersData } from "../controller/MoneyCollectDataController.js";

const GetMoneyCollectRoute = express.Router();

GetMoneyCollectRoute.get("/money-collect", authenticateToken, Moneycollect);
GetMoneyCollectRoute.get("/money-collect-data", authenticateToken, MoneycollectUsersData);
GetMoneyCollectRoute.get("/smart-active-users", authenticateToken, GetActiveUsersCount);

export default GetMoneyCollectRoute;