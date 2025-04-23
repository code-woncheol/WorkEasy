import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "이건 보호된 정보입니다.",
    user: (req as any).user,
  });
});

export default router;
