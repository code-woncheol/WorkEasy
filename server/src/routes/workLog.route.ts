// src/routes/attendance.route.ts
import { Router } from "express";
import { pool } from "../config/db";

const router = Router();

// GET /api/attendance
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM work_log");
    res.json(rows);
  } catch (error) {
    console.error("Failed to fetch attendance data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
