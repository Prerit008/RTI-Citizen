import { Router } from "express";
import { applicationController } from "../controllers/applicationController.js";
import { optionalAuth } from "../middleware/auth.js";

const router = Router();

// Stats route (must be before :regNumber to prevent route collision)
router.get("/stats/summary", optionalAuth, applicationController.getStats);

// Create new application (supports both logged-in and guest filings)
router.post("/", optionalAuth, applicationController.create);

// List applications (filters by user if authenticated)
router.get("/", optionalAuth, applicationController.list);

// Track specific application by registration number
router.get("/:regNumber", applicationController.getByRegistrationNumber);

export default router;
