import express from "express";
import { Debtors } from "../controller/DebtDataController.js";
import authenticateToken from "../middleware/verifyToken.js";

const GetDebtDataRoute = express.Router();

GetDebtDataRoute.get("/debtors", authenticateToken, Debtors);

export default GetDebtDataRoute;