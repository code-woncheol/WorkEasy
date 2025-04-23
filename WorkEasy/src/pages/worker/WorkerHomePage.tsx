// src/pages/worker/WorkerHomePage.tsx
import { Box, Button } from "@mui/material";
import ClockInOut from "../../components/ClockInOut";
import RealTimer from "../../components/RealTimer";
import WorkLocation from "../../components/WorkLocation";
import { getUserFromToken } from "../../utils/jwt";

export default function WorkerHomePage() {
  const user = getUserFromToken();
  const workerId = user?.userId;

  const logout = () => {
    localStorage.removeItem("token"); // ✅ JWT 삭제
    window.location.href = "/worker/login"; // ✅ 로그인 페이지로 이동
  };

  return (
    <Box px={2} py={4}>
      <RealTimer />
      {workerId ? (
        <WorkLocation workerId={workerId} />
      ) : (
        <p style={{ color: "red" }}>로그인이 필요합니다.</p>
      )}
      <ClockInOut disabled={!workerId} />
      <Box display="flex" justifyContent="center" mt={2}>
        <Button variant="outlined" color="error" onClick={logout}>
          로그아웃
        </Button>
      </Box>
    </Box>
  );
}
