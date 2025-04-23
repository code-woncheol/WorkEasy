// ./src/routes/auth.route.ts
import { pool } from "../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response, Router } from "express";

const router = Router();

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    res.status(400).json({ message: "전화번호와 비밀번호를 입력해주세요." });
    return;
  }

  try {
    const [rows] = await pool.query(
      "SELECT * FROM worker_account WHERE phone = ? AND is_active = 1",
      [phone]
    );

    const user =
      Array.isArray(rows) && rows.length > 0 ? (rows[0] as any) : null;

    if (!user) {
      res.status(401).json({ message: "계정을 찾을 수 없습니다." });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ message: "비밀번호가 올바르지 않습니다." });
      return;
    }

    const token = jwt.sign(
      { userId: user.user_id, phone: user.phone },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 오류" });
  }
});

export default router; // ✅ default export 반드시 필요
