import express from "express";
import { Debtors } from "../controller/DebtDataController.js";
import authenticateToken from "../middleware/verifyToken.js";

const DebtDataRoute = express.Router();

DebtDataRoute.get("/debtors", authenticateToken, Debtors);

export default DebtDataRoute;