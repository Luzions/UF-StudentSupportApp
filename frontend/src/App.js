import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import RegisterPage from "./pages/RegisterPage";
import AlertsResources from "./pages/AlertsResources";
import Dashboard from "./pages/Dashboard";
import GpaTracker from './pages/GpaTracker';
import UserPage from './pages/UserPage';
import CalendarPage from './pages/CalendarPage';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/alertsResources" element={<AlertsResources />} />
        <Route path="/student-dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/gpa-tracker" element={<GpaTracker />} />
        <Route path="/user-profiles" element={<UserPage />} />
        <Route path="/calendarPage" element={<CalendarPage />} />
      </Routes>
    </Router>
  );
}

export default App;
