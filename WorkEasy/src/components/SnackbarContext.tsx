// src/contexts/SnackbarContext.tsx
import { createContext, useContext, useState } from "react";
import { Snackbar } from "@mui/material";

const SnackbarContext = createContext<(msg: string) => void>(() => {});

export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const showSnackbar = (msg: string) => {
    setMessage(msg);
    setOpen(true);
  };

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      <Snackbar
        open={open}
        message={message}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          top: "50% !important",
          transform: "translateY(-50%)",
        }}
      />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
