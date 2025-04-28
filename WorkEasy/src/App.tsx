import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorkerHomePage from "./pages/worker/WorkerHomePage";
import WorkerLoginPage from "./pages/worker/WorkerLoginPage";
import { SnackbarProvider } from "./components/SnackbarContext";
import AdminHomePage from "./pages/admin/AdminHomePage";

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <Routes>
          <Route path="/admin/home" element={<AdminHomePage />} />
          <Route path="/worker/home" element={<WorkerHomePage />} />
          <Route path="/worker/login" element={<WorkerLoginPage />} />
        </Routes>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
