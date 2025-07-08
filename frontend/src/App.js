import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
