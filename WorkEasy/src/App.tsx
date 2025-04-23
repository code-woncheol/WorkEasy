import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserHomePage from './pages/user/UserHomePage';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/UserHomePage" element={<UserHomePage />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
