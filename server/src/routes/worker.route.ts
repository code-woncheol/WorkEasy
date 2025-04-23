import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import { pool } from "../config/db";
import { RowDataPacket } from "mysql2";

const router = Router();

// ✅ 사용자 정보 확인 API
router.get("/profile", verifyToken, (req, res): void => {
  res.json({
    message: "이건 보호된 정보입니다.",
    user: (req as any).user,
  });
});

router.post("/clock-in", verifyToken, async (req, res): Promise<void> => {
  const userId = (req as any).user.userId;

  try {
    const [existing] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM work_log 
         WHERE worker_id = ? AND DATE(clock_in) = CURDATE()`,
      [userId]
    );

    if (existing.length > 0) {
      res.status(400).json({
        message:
          "오늘 이미 출근했습니다.\n수정을 원할 시 담당자에게 연락해주세요.",
      });
      return;
    }

    await pool.query(
      `INSERT INTO work_log (worker_id, clock_in) VALUES (?, NOW())`,
      [userId]
    );

    await pool.query(
      `UPDATE worker SET is_working_now = 1 WHERE worker_id = ?`,
      [userId]
    );

    res.json({ message: "출근 완료" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "출근 실패" });
  }
});

// ✅ 퇴근 API
router.post("/clock-out", verifyToken, async (req, res): Promise<void> => {
  const userId = (req as any).user.userId;

  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM work_log 
       WHERE worker_id = ? AND clock_out IS NULL 
       ORDER BY clock_in DESC LIMIT 1`,
      [userId]
    );

    if (rows.length === 0) {
      res.status(400).json({ message: "출근 기록이 없습니다." });
      return;
    }

    const log = rows[0];
    const clockInTime = new Date(log.clock_in);
    const now = new Date();
    const diffMs = now.getTime() - clockInTime.getTime();
    const minutes = Math.floor(diffMs / (1000 * 60));

    await pool.query(
      `UPDATE work_log 
       SET clock_out = NOW(), worked_minutes = ? 
       WHERE log_id = ?`,
      [minutes, log.log_id]
    );

    // ✅ worker 테이블 상태도 퇴근으로 설정
    await pool.query(
      `UPDATE worker SET is_working_now = 0 WHERE worker_id = ?`,
      [userId]
    );

    res.json({ message: "퇴근 완료", workedMinutes: minutes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "퇴근 실패" });
  }
});

// ✅ 출근 상태 조회 API
router.get("/status", verifyToken, async (req, res): Promise<void> => {
  const userId = (req as any).user.userId;

  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT is_working_now FROM worker WHERE worker_id = ?`,
      [userId]
    );

    if (rows.length === 0) {
      res.status(404).json({ message: "사용자 없음" });
      return;
    }

    res.json({ isWorkingNow: rows[0].is_working_now === 1 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "상태 확인 실패" });
  }
});

export default router;
