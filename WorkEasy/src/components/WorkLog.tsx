// src/components/WorkLog.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { sortBy } from "lodash";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material"; // 🔥 추가

axios.defaults.baseURL = "http://localhost:5000";

type WorkLog = {
  log_id: number;
  worker_id: number;
  clock_in: string;
  clock_out: string | null;
  worked_minutes: number | null;
  location_id: number | null;
};

const columns: GridColDef[] = [
  { field: "log_id", headerName: "ID", width: 80 },
  { field: "worker_id", headerName: "직원 ID", width: 100 },
  { field: "clock_in", headerName: "출근 시간", width: 200 },
  { field: "clock_out", headerName: "퇴근 시간", width: 200 },
  { field: "worked_minutes", headerName: "근무 시간 (분)", width: 150 },
  { field: "location_id", headerName: "근무지 ID", width: 120 },
];

const WorkLog = () => {
  const [logs, setLogs] = useState<WorkLog[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get<WorkLog[]>("/api/work-log");
        const sortedLogs = sortBy(response.data, "worked_minutes");
        setLogs(sortedLogs);
      } catch (error) {
        console.error("출퇴근 데이터 불러오기 실패:", error);
      }
    };

    fetchLogs();
  }, []);

  const rows = logs.map((log) => ({
    id: log.log_id, // DataGrid는 id 필드 필수
    ...log,
    clock_in: new Date(log.clock_in).toLocaleString(),
    clock_out: log.clock_out
      ? new Date(log.clock_out).toLocaleString()
      : "근무 중",
  }));

  return (
    <Box px={2} py={4}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        출퇴근 기록 (MUI DataGrid)
      </Typography>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
        />
      </Box>
    </Box>
  );
};

export default WorkLog;
