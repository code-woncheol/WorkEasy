// src/index.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route"; // ✅ default import
import workerRouter from "./routes/worker.route";

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

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
