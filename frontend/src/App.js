import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import RegisterPage from "./pages/RegisterPage";
import AlertsResources from "./pages/AlertsResources";
import Dashboard from "./pages/Dashboard";
import GpaTracker from './pages/GpaTracker';


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
        <Route path="/admin-dashboard" element={<Dashboard />} />  // Will need to update to counselor
        <Route path="/gpa-tracker" element={<GpaTracker />} />
      </Routes>
    </Router>
  );
}

export default App;
