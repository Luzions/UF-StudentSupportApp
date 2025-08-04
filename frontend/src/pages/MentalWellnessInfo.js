import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function MentalWellnessInfo() {
  useEffect(() => {
    document.body.style.backgroundColor = "#fef9f6";
    document.documentElement.style.backgroundColor = "#fef9f6";
  }, []);

  const styles = {
    container: {
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      backgroundColor: "#fbbf24",
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
      color: "#1e3a8a",
      marginBottom: "1rem",
      lineHeight: "1.2",
    },
    subtitle: {
      fontSize: "1.2rem",
      color: "#475569",
      fontWeight: "400",
      margin: "0",
    },
    section: {
      marginBottom: "2.5rem",
    },
    sectionTitle: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#1e3a8a",
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
      backgroundColor: "#fbbf24",
      borderRadius: "2px",
    },
    paragraph: {
      fontSize: "1.1rem",
      color: "#475569",
      lineHeight: "1.7",
      margin: "0 0 1rem 0",
    },
    calloutBox: {
      backgroundColor: "#fef9f6",
      border: "1px solid #facc15",
      borderRadius: "8px",
      padding: "1.5rem",
      marginTop: "1rem",
      textAlign: "center",
    },
    loginLink: {
      marginTop: "1rem",
      display: "inline-block",
      backgroundColor: "#1e3a8a",
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
          <h1 style={styles.title}>Mental Wellness & Support</h1>
          <p style={styles.subtitle}>
            Because grades matter — but your well-being matters more
          </p>
        </header>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.sectionTitleAccent}></span>
            Understanding Student Burnout
          </h2>
          <p style={styles.paragraph}>
            Between classes, assignments, and deadlines, it's easy to feel overwhelmed. Student stress often leads to fatigue, anxiety, and isolation — especially when trying to manage it all alone.
          </p>
          <p style={styles.paragraph}>
            You are not alone. Our platform offers mental wellness support built directly into your academic dashboard. A space to check in, reflect, and ask for help when it’s needed most.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.sectionTitleAccent}></span>
            How We Support You
          </h2>
          <ul style={{ paddingLeft: "1.25rem", lineHeight: "1.8", color: "#475569" }}>
            <li>Check-in prompts to reflect on your mood and energy levels</li>
            <li>Access to crisis resources and support contact info</li>
            <li>Anonymous feedback channels to talk about mental health needs</li>
            <li>Built-in reminders that it’s okay to take breaks</li>
          </ul>
        </section>

        <div style={styles.calloutBox}>
          <p style={styles.paragraph}>
            <strong>Ready to take care of your mind and your goals?</strong> Create an account and start building your wellness dashboard today.
          </p>
          <Link to="/login" style={styles.loginLink}>
            Create Your Account
          </Link>
        </div>
      </div>
    </div>
  );
}