import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import RegisterPage from "./pages/RegisterPage";
import AlertsResources from "./pages/AlertsResources";
import Dashboard from "./pages/Dashboard";
import GpaTracker from "./pages/GpaTracker";
//import CourseMap from "./pages/CourseMap";
import LoggedOut from "./pages/LoggedOut";
import UserPage from "./pages/UserPage";
import CalendarPage from "./pages/CalendarPage";
import GpaTrackerInfo from "./pages/GpaTrackerInfo";
import MentalWellnessInfo from "./pages/MentalWellnessInfo";
import Wellness from "./pages/Wellness";
import CourseMapping from "./pages/CourseMapping";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/alertsResources" element={<AlertsResources />} />
        <Route path="/gpainfo" element={<GpaTrackerInfo />} />
        <Route path="/mental-wellness" element={<MentalWellnessInfo />} />
        <Route path="/student-dashboard" element={<Dashboard />} />
        <Route path="/counselor-dashboard" element={<Dashboard />} />
        <Route path="/logged-out" element={<LoggedOut />} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/gpa-tracker" element={<GpaTracker />} />
        <Route path="/user-profiles" element={<UserPage />} />
        <Route path="/calendarPage" element={<CalendarPage />} />
        <Route path="/wellness" element={<Wellness />} />
        <Route path="/course-mapping" element={<CourseMapping />} />
      </Routes>
    </Router>
  );
}

export default App;
