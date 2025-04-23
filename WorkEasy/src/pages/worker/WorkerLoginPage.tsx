import { useState, useEffect } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../components/SnackbarContext"; // ✅ 전역 스낵바

const WorkerLoginPage = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const snackbar = useSnackbar(); // ✅ context 기반 snackbar 사용

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      snackbar("이미 로그인된 상태입니다"); // ✅ 스낵바 출력
      setTimeout(() => {
        navigate("/worker/home"); // ✅ 0초 후 리디렉션
      }, 0);
    }
  }, [navigate, snackbar]);

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "로그인 실패");
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      navigate("/worker/home");
    } catch (err) {
      setError("서버 오류");
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, border: "1px solid #ccc", borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          직원 로그인
        </Typography>

        <TextField
          label="전화번호"
          fullWidth
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          label="비밀번호"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          로그인
        </Button>
      </Box>
    </Container>
  );
};

export default WorkerLoginPage;
