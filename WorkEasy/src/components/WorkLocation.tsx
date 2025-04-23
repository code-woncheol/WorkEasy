import React from "react";
import { Card, Typography, Box } from "@mui/material";

const userNameMap: Record<number, string> = {
  1: "김경비",
  2: "박보안",
  3: "이순찰",
  4: "유경비",
};

const workLocationMap: Record<string, string> = {
  김경비: "서울 A빌딩 정문",
  박보안: "부산 스마트타워",
  이순찰: "인천항 물류센터",
  유경비: "대구 시청 앞",
};

type WorkLocationProps = {
  workerId: number;
};

const WorkLocation: React.FC<WorkLocationProps> = ({ workerId }) => {
  const name = userNameMap[workerId];
  const location = name ? workLocationMap[name] : undefined;

  return (
    <Box display="flex" justifyContent="center" mt={2} px={1}>
      <Card sx={{ p: 1, width: "100%", maxWidth: 400, textAlign: "center" }}>
        {name ? (
          <>
            <Typography color="gray" sx={{ fontSize: "0.7rem" }}>
              {name}님의 작업 위치:
            </Typography>

            <Typography sx={{ mt: 1, fontWeight: "bold" }}>
              {location || "위치 정보 없음"}
            </Typography>
          </>
        ) : (
          <Typography color="error">사용자 정보가 존재하지 않습니다</Typography>
        )}
      </Card>
    </Box>
  );
};

export default WorkLocation;
