// src/pages/Dashboard.js
import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const fullName = localStorage.getItem("full_name");
  const role = localStorage.getItem("role");
  const college = localStorage.getItem("college");
  const capitalizedRole = role.charAt(0).toUpperCase() + role.slice(1);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const styles = {
    container: {
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      background: "linear-gradient(to right, #FA4616, #0021A5)",
      minHeight: "100vh",
      width: "100vw",
      padding: "1rem",
      boxSizing: "border-box",
    },
    topBar: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: "1rem",
    },
    topLink: {
      color: "#ffffff",
      marginLeft: "1.5rem",
      cursor: "pointer",
      fontWeight: "500",
      textDecoration: "underline",
    },
    content: {
      width: "100%",
      maxWidth: "1200px",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      padding: "2.5rem",
      margin: "0 auto",
      boxSizing: "border-box",
    },
    header: {
      textAlign: "center",
      marginBottom: "2rem",
    },
    title: {
      fontSize: "2.2rem",
      fontWeight: "700",
      color: "#0021A5",
      marginBottom: "0.5rem",
      lineHeight: "1.2",
    },
    subtext: {
      fontSize: "1.1rem",
      color: "#475569",
      margin: "0.25rem 0",
    },
    divider: {
      height: "1px",
      width: "100%",
      backgroundColor: "#e2e8f0",
      marginTop: "1rem",
      marginBottom: "2rem",
    },
    featureGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "1.5rem",
      marginTop: "2rem",
    },
    featureCard: {
      backgroundColor: "#fefcfb",
      padding: "1.5rem",
      borderRadius: "8px",
      border: "1px solid #e2e8f0",
      borderLeft: "6px solid #FA4616",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      transition: "transform 0.2s ease",
    },
    featureTitle: {
      fontSize: "1.2rem",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "0.5rem",
    },
    featureDescription: {
      fontSize: "1rem",
      color: "#475569",
      lineHeight: "1.6",
    },
    footer: {
      textAlign: "center",
      marginTop: "3rem",
      paddingTop: "2rem",
      borderTop: "1px solid #e2e8f0",
      fontSize: "0.95rem",
      color: "#475569",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <span style={styles.topLink} onClick={handleLogout}>
          Logout
        </span>
        <span style={styles.topLink}>Account Settings</span>
      </div>

      <div style={styles.content}>
        <header style={styles.header}>
          <h1 style={styles.title}>
            Welcome to your {capitalizedRole} Dashboard, {fullName}!
          </h1>
          <p style={styles.subtext}>Your role: {capitalizedRole}</p>
          <p style={styles.subtext}>Your college: {college}</p>
          <div style={styles.divider}></div>
        </header>

        <div style={styles.featureGrid}>
          <Link
            to="/gpa-tracker"
            style={{ ...styles.featureCard, textDecoration: "none", color: "inherit" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3 style={styles.featureTitle}>GPA Tracking</h3>
            <p style={styles.featureDescription}>
              Track your GPA and monitor course progress.
            </p>
          </Link>

          <div
            style={styles.featureCard}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3 style={styles.featureTitle}>Wellness Support</h3>
            <p style={styles.featureDescription}>
              Regular check-ins, mood tracking, and resources to support your mental health and overall well-being.
            </p>
          </div>

          <div
            style={styles.featureCard}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3 style={styles.featureTitle}>Course Mapping</h3>
            <p style={styles.featureDescription}>
              Plan your degree path with intelligent insights and recommendations using a visual course map.
            </p>
          </div>
        </div>

        <footer style={styles.footer}>
          <p>
            Developed by Group 3 | University of Florida Intro to Software Engineering Project
          </p>
        </footer>
      </div>
    </div>
  );
}