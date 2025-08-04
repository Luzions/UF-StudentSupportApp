import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function GpaTrackerInfo() {
  useEffect(() => {
    document.body.style.backgroundColor = "#f8fafc";
    document.documentElement.style.backgroundColor = "#f8fafc";
  }, []);

  const styles = {
    container: {
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      backgroundColor: "#FA4616",
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      padding: "1rem",
    },
    content: {
      width: "100%",
      maxWidth: "1500px",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      padding: "2.5rem",
      margin: "0 auto",
    },
    header: {
      textAlign: "center",
      marginBottom: "3rem",
      paddingBottom: "2rem",
      borderBottom: "1px solid #e2e8f0",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "700",
      color: "#0021A5",
      marginBottom: "1rem",
      lineHeight: "1.2",
    },
    subtitle: {
      fontSize: "1.2rem",
      color: "#64748b",
      fontWeight: "400",
      margin: "0",
    },
    section: {
      marginBottom: "2.5rem",
    },
    sectionTitle: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#0021A5",
      marginBottom: "1rem",
      position: "relative",
      paddingLeft: "1rem",
    },
    sectionTitleAccent: {
      position: "absolute",
      left: "0",
      top: "0",
      bottom: "0",
      width: "4px",
      backgroundColor: "#FA4616",
      borderRadius: "2px",
    },
    paragraph: {
      fontSize: "1.1rem",
      color: "#475569",
      lineHeight: "1.7",
      margin: "0 0 1rem 0",
    },
    highlight: {
      backgroundColor: "#f1f5f9",
      padding: "1.5rem",
      borderRadius: "8px",
      border: "1px solid #cbd5e1",
      marginTop: "1rem",
      textAlign: "center",
    },
    loginLink: {
      marginTop: "1rem",
      display: "inline-block",
      backgroundColor: "#FA4616",
      color: "white",
      padding: "0.75rem 1.5rem",
      borderRadius: "6px",
      textDecoration: "none",
      fontWeight: "600",
      transition: "background-color 0.3s ease",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <header style={styles.header}>
          <h1 style={styles.title}>Explore the GPA Tracker</h1>
          <p style={styles.subtitle}>
            Your personal dashboard for academic progress and performance
          </p>
        </header>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.sectionTitleAccent}></span>
            Why Use the GPA Tracker?
          </h2>
          <p style={styles.paragraph}>
            The GPA Tracker provides students with an easy way to monitor their current academic standing, plan future goals, and stay organized throughout their college journey.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.sectionTitleAccent}></span>
            Key Features
          </h2>
          <ul style={{ paddingLeft: "1.25rem", lineHeight: "1.8", color: "#475569" }}>
            <li>Instant GPA calculation per term or cumulatively</li>
            <li>Real-time updates for profile and academic fields</li>
            <li>Simple interface for tracking progress your semester progress</li>
          </ul>
        </section>

        <section style={styles.highlight}>
          <p style={styles.paragraph}>
            <strong>Want to see it in action?</strong> Try it out today by logging in with your account.
          </p>
          <Link to="/login" style={styles.loginLink}>
            Go to Login
          </Link>
        </section>
      </div>
    </div>
  );
}