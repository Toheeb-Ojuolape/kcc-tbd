import { createCredentials } from "../controllers/createCredential.js";
import { createRecord } from "../controllers/createRecord.js";
import { queryRecord } from "../controllers/queryRecord.js";
import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import { createCustomerToken } from "../controllers/createCustomerToken.js";
import { storeVC } from "../controllers/storeVC.js";
const router = Router();

router.post("/token", createCustomerToken)
router.post("/credentials", verifyToken, createCredentials)
router.post("/store-vc", verifyToken, storeVC)
router.post("/create-record", createRecord);
router.get("/query-record", queryRecord);

export default router;
