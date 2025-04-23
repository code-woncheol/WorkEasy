import ClockInOut from "../../components/ClockInOut";
import RealTimer from "../../components/RealTimer";
import WorkLocation from "../../components/WorkLocation";
import { Box } from "@mui/material";

export default function UserHomePage() {
  return (
    <Box px={2} py={4}>
      <RealTimer />
      <WorkLocation workerId={4} />
      <ClockInOut />
    </Box>
  );
}
