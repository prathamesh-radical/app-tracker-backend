import express from "express";
import { Debtors, GetActiveUsersCount } from "../controller/DebtDataController.js";
import authenticateToken from "../middleware/verifyToken.js";

const GetDebtDataRoute = express.Router();

GetDebtDataRoute.get("/debtors", authenticateToken, Debtors);
GetDebtDataRoute.get("/debt-active-users", authenticateToken, GetActiveUsersCount);

export default GetDebtDataRoute;