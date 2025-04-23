import { Box, Typography, Button, Card } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  disabled?: boolean;
};

const ClockInOut = ({ disabled }: Props) => {
  const [clockIn, setClockIn] = useState<boolean>(false); // 초기값 false

  useEffect(() => {
    const fetchStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/api/worker/status", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setClockIn(data.isWorkingNow); // ✅ DB에서 받아온 값 설정
      } catch (err) {
        console.error("출근 상태 가져오기 실패", err);
      }
    };

    fetchStatus();
  }, []);

  const changeWorkStatus = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("❌ 토큰 없음");
      return;
    }

    const endpoint = clockIn ? "clock-out" : "clock-in";

    try {
      const res = await fetch(`http://localhost:5000/api/worker/${endpoint}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      console.log("✅ 응답 상태", res.status);
      console.log("✅ 응답 메시지", data.message);

      if (res.ok) {
        setClockIn(!clockIn); // 상태 반영
      } else {
        alert(`요청 실패: ${data.message}`);
      }
    } catch (err) {
      console.error("출퇴근 처리 실패", err);
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={2} px={1}>
      <Card sx={{ p: 4, width: "100%", maxWidth: 400, textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          출퇴근 체크
        </Typography>

        <Typography
          sx={{
            color: clockIn ? "#1976d2" : "#d32f2f",
            mb: 2,
            fontSize: { xs: "1rem", sm: "1.2rem" },
          }}
        >
          현재 상태: {clockIn ? "근무 중" : "근무 중이 아님"}
        </Typography>

        <Button
          variant="contained"
          fullWidth
          color={clockIn ? "error" : "primary"}
          onClick={changeWorkStatus}
          disabled={disabled}
        >
          {clockIn ? "퇴근하기" : "출근하기"}
        </Button>
      </Card>
    </Box>
  );
};

export default ClockInOut;
