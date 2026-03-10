import express from "express";
import {
    Debtors, GuestEntry, GuestEntryUsersData, Mechanic, MechanicServicesData, MechanicUsersData, Moneycollect, MoneycollectUsersData
} from "../controller/GetDataController.js";

const GetRoutes = express.Router();

GetRoutes.get("/debtors", Debtors);
GetRoutes.get("/mechanic", Mechanic);
GetRoutes.get("/mechanic-data", MechanicUsersData);
GetRoutes.get("/mechanic-services-data", MechanicServicesData);
GetRoutes.get("/money-collect", Moneycollect);
GetRoutes.get("/money-collect-data", MoneycollectUsersData);
GetRoutes.get("/guest-entries", GuestEntry);
GetRoutes.get("/guest-entries-data", GuestEntryUsersData);

export default GetRoutes;