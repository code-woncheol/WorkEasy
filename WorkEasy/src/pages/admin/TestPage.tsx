// src/pages/admin/TestPage.tsx
import { Box, Button, Stack, Typography } from "@mui/material";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";

export default function TestPage() {
  // ✅ 상태: 표시할 데이터 목록
  const [items, setItems] = useState<number[]>([]);

  // ✅ 처음 20개 데이터 로드
  useEffect(() => {
    const initialItems = _.range(1, 21); // 1~20
    setItems(initialItems);
  }, []);

  // ✅ Debounce 클릭 핸들러
  const handleDebounceClick = useCallback(
    _.debounce(() => {
      console.log("✅ Debounce 버튼 클릭됨! (500ms 후)");
    }, 500),
    []
  );

  // ✅ Throttle 클릭 핸들러
  const handleThrottleClick = useCallback(
    _.throttle(() => {
      console.log("✅ Throttle 버튼 클릭됨! (1초에 1번)");
    }, 1000),
    []
  );

  // ✅ 더 많은 데이터 로드 (가짜로 10개 추가)
  const loadMoreItems = () => {
    setItems((prevItems) => {
      const nextItems = _.range(prevItems.length + 1, prevItems.length + 11); // 10개 추가
      return [...prevItems, ...nextItems];
    });
    console.log("🌟 더 많은 데이터 추가됨!");
  };

  // ✅ 스크롤 감지 핸들러
  const handleScroll = useCallback(
    _.throttle(() => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;

      if (scrollTop + windowHeight >= fullHeight - 100) {
        loadMoreItems();
      }
    }, 1000),
    []
  );

  // ✅ 스크롤 이벤트 연결
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <Box p={2} minHeight="100vh">
      <Stack spacing={2} direction="row" mb={4}>
        {/* Debounce 버튼 */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleDebounceClick}
        >
          Debounce 버튼
        </Button>

        {/* Throttle 버튼 */}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleThrottleClick}
        >
          Throttle 버튼
        </Button>
      </Stack>

      {/* ✅ 데이터 리스트 표시 */}
      <Stack spacing={1}>
        {items.map((item) => (
          <Box key={item} p={2} border="1px solid gray" borderRadius={2}>
            <Typography>항목 #{item}</Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
