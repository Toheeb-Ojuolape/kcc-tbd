
import { createCredentials } from "../controllers/createCredential.js";
import { createCustomerToken } from "../controllers/createCustomerToken.js";
import { storeVC } from "../controllers/storeVC.js";
import verifyToken from "../middleware/verifyToken.js";
import { Router } from "express";
const router = Router();

router.post("/token", createCustomerToken)
router.post("/credentials", verifyToken, createCredentials)
router.post("/store-vc", verifyToken, storeVC)

export default router;
