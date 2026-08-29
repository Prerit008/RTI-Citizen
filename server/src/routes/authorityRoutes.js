import { Router } from "express";
import { authorityController } from "../controllers/authorityController.js";

const router = Router();

router.get("/", authorityController.list);
router.get("/:id", authorityController.getById);

export default router;
