import express from "express";
import authenticateToken from "../middleware/verifyToken.js";
import { Moneycollect, MoneycollectUsersData } from "../controller/MoneyCollectDataController.js";

const GetMoneyCollectRoute = express.Router();

GetMoneyCollectRoute.get("/money-collect", authenticateToken, Moneycollect);
GetMoneyCollectRoute.get("/money-collect-data", authenticateToken, MoneycollectUsersData);

export default GetMoneyCollectRoute;