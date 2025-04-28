// src/index.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route"; // ✅ default import
import workerRouter from "./routes/worker.route";
import attendanceRouter from "./routes/workLog.route"; // 🔥 추가

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/worker", workerRouter);
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});
app.use("/api/auth", authRouter); // ✅ Router 인스턴스를 등록
// 새로 추가
app.use("/api/work-log", attendanceRouter); // 🔥 추가

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
