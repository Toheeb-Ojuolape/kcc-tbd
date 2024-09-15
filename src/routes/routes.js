import { createRecord } from "../controllers/createRecord.js";
import { queryRecord } from "../controllers/queryRecord.js";
import { Router } from "express";
const router = Router();


router.post("/create-record", createRecord);
router.get("/query-record", queryRecord);

export default router;
