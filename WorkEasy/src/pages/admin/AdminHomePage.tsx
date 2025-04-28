// src/pages/worker/WorkerHomePage.tsx
import { Box } from "@mui/material";
import WorkLog from "../../components/WorkLog";

export default function AdminHomePage() {
  return (
    <Box px={2} py={4}>
      <WorkLog />
    </Box>
  );
}
