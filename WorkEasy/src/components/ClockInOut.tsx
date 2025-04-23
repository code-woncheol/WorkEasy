import { Box, Typography, Button, Card } from "@mui/material";
import { useEffect, useState } from "react";

const ClockInOut = () => {
  const getInitialClockIn = () => {
    const saved = localStorage.getItem("clockIn");
    return saved === "true";
  };

  const [clockIn, setClockIn] = useState<boolean>(getInitialClockIn);

  useEffect(() => {
    localStorage.setItem("clockIn", clockIn.toString());
  }, [clockIn]);

  const changeWorkStatus = () => {
    setClockIn((prev) => !prev);
  };

  return (
    <Box display="flex" justifyContent="center" mt={2} px={1}>
      <Card sx={{ p: 4, width: "100%", maxWidth: 400, textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          출퇴근 체크
        </Typography>

        <Typography
          sx={{
            color: clockIn ? "#primary" : "#d32f2f",
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
        >
          {clockIn ? "퇴근하기" : "출근하기"}
        </Button>
      </Card>
    </Box>
  );
};

export default ClockInOut;
