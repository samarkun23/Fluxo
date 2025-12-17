import { Router, type Request, type Response } from "express";
import { authMiddleware } from "../../middleware/auth.js";

const router = Router();

router.post("/", authMiddleware, (req: Request, res: Response) => {

})

router.get("/", authMiddleware, (req: Request, res: Response) => {

})

router.get("/:zapId", authMiddleware, (req: Request, res: Response) => {})

export const zapRouter = router