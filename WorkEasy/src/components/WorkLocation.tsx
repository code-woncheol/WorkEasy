import React, { useEffect, useState } from "react";
import { Card, Typography, Box, CircularProgress } from "@mui/material";
import axios from "axios";

type ProfileInfo = {
  work_name: string;
  location_name: string;
};

const WorkLocation: React.FC = () => {
  const [profile, setProfile] = useState<ProfileInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // 🔥 토큰 꺼내기

        const response = await axios.get<ProfileInfo>(
          "/api/worker/profile-info",
          {
            headers: {
              Authorization: `Bearer ${token}`, // 🔥 헤더에 토큰 추가
            },
          }
        );

        setProfile(response.data);
      } catch (error) {
        console.error("프로필 정보를 불러오는 데 실패했습니다:", error);
        setError("프로필 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <Box display="flex" justifyContent="center" mt={2} px={1}>
      <Card sx={{ p: 2, width: "100%", maxWidth: 400, textAlign: "center" }}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : profile ? (
          <>
            <Typography color="gray" sx={{ fontSize: "0.7rem" }}>
              <Box
                component="span"
                sx={{ color: "black", fontWeight: "bold", fontSize: "1rem" }}
              >
                {profile.work_name}
              </Box>
              님의 작업 위치:
            </Typography>

            <Typography sx={{ mt: 1, fontWeight: "bold", fontSize: "2rem" }}>
              {profile.location_name || "위치 정보 없음"}
            </Typography>
          </>
        ) : (
          <Typography color="error">프로필 정보를 찾을 수 없습니다.</Typography>
        )}
      </Card>
    </Box>
  );
};

export default WorkLocation;
