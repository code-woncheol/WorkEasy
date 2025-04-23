import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

const RealTimer = () => {
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Typography
      variant="h5"
      sx={{
        fontWeight: "bold",
        mb: 2,
        textAlign: "center",
        fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
      }}
    >
      🕒 현재 시간: {time}
    </Typography>
  );
};

export default RealTimer;
