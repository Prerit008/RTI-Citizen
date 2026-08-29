import { Router } from "express";
import { appealController } from "../controllers/appealController.js";
import { optionalAuth } from "../middleware/auth.js";

const router = Router();

router.post("/", optionalAuth, appealController.create);
router.get("/", optionalAuth, appealController.list);
router.get("/parent/:regNumber", appealController.getByParentRegistration);
router.get("/:appealNumber", appealController.getByAppealNumber);

export default router;
