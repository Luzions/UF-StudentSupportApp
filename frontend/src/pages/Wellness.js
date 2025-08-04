import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Wellness() {
  const [mood, setMood] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [
    "Breathe in. Breathe out. You’ve got this.",
    "One small step at a time is still movement.",
    "Your feelings are valid, and your presence matters.",
    "Storms make trees take deeper roots.",
    "You don’t have to do it all to be enough.",
  ];

  useEffect(() => {
    document.body.style.backgroundColor = "#fef9f6";
    document.documentElement.style.backgroundColor = "#fef9f6";

    const quoteTimer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 8000);

    return () => clearInterval(quoteTimer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mood) {
      setSubmitted(true);
    }
  };

  const styles = {
    container: {
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      backgroundColor: "#fbbf24",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      padding: "1rem",
      position: "relative",
    },
    content: {
      maxWidth: "900px",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      padding: "2.5rem",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "#1e3a8a",
      marginBottom: "1rem",
      textAlign: "center",
    },
    rotatingQuote: {
      fontSize: "1rem",
      fontStyle: "italic",
      color: "#475569",
      marginBottom: "2rem",
      textAlign: "center",
      transition: "opacity 1s ease-in-out",
    },
    questionLabel: {
      fontSize: "1.2rem",
      fontWeight: "600",
      color: "#1e3a8a",
      marginBottom: "1rem",
    },
    moodForm: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      marginBottom: "1.5rem",
    },
    option: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
    },
    button: {
      backgroundColor: "#1e3a8a",
      color: "#fff",
      border: "none",
      padding: "0.75rem 1.25rem",
      fontSize: "1rem",
      fontWeight: "600",
      borderRadius: "6px",
      cursor: "pointer",
      marginTop: "1rem",
      width: "fit-content",
    },
    resultBox: {
      backgroundColor: "#fef9f6",
      border: "1px solid #facc15",
      borderRadius: "8px",
      padding: "1.5rem",
      textAlign: "center",
      marginTop: "1rem",
    },
    appointmentLink: {
      marginTop: "1rem",
      display: "inline-block",
      backgroundColor: "#fbbf24",
      color: "#1e3a8a",
      padding: "0.75rem 1.5rem",
      borderRadius: "6px",
      textDecoration: "none",
      fontWeight: "600",
    },
    badge: {
      fontSize: "2rem",
      marginTop: "1.25rem",
    },
    resourceBox: {
      fontSize: "0.95rem",
      marginTop: "1rem",
      backgroundColor: "#fef3c7",
      padding: "1rem",
      borderRadius: "8px",
      textAlign: "center",
      color: "#374151",
    },
    externalLink: {
      color: "#1d4ed8",
      textDecoration: "underline",
      fontWeight: "500",
    },
    emergencyBox: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      backgroundColor: "#dc2626",
      color: "#fff",
      padding: "1rem",
      borderRadius: "8px",
      textAlign: "center",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    },
    navLink: {
      display: "block",
      marginTop: "0.5rem",
      color: "#fff",
      textDecoration: "underline",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Wellness Check-In</h1>
        <div style={styles.rotatingQuote}>{quotes[quoteIndex]}</div>

        <form style={styles.moodForm} onSubmit={handleSubmit}>
          <label style={styles.questionLabel}>How are you feeling today?</label>
          <div style={styles.option}>
            <input
              type="radio"
              id="bad"
              name="mood"
              value="bad"
              checked={mood === "bad"}
              onChange={() => setMood("bad")}
            />
            <label htmlFor="bad">Not great / overwhelmed</label>
          </div>
          <div style={styles.option}>
            <input
              type="radio"
              id="okay"
              name="mood"
              value="okay"
              checked={mood === "okay"}
              onChange={() => setMood("okay")}
            />
            <label htmlFor="okay">Doing okay</label>
          </div>
          <div style={styles.option}>
            <input
              type="radio"
              id="great"
              name="mood"
              value="great"
              checked={mood === "great"}
              onChange={() => setMood("great")}
            />
            <label htmlFor="great">Feeling good!</label>
          </div>

          <button type="submit" style={styles.button}>Submit Check-In</button>
        </form>

        <div style={styles.resourceBox}>
          Visit{" "}
          <a
            href="https://counseling.ufl.edu/resources/"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.externalLink}
          >
            UF Mental Health Resources
          </a>{" "}
          for guidance, counseling, and support options.
        </div>

        {submitted && (
          <div style={styles.resultBox}>
            <p>
              {mood === "bad"
                ? "We're here to support you. You can reach out anytime."
                : mood === "okay"
                ? "Glad you're holding steady. A quick chat with your counselor might help!"
                : "Love that energy! Keep it up — and stay connected."}
            </p>
            <Link to="/login" style={styles.appointmentLink}>
              Check In With a Counselor
            </Link>
            <div style={styles.badge}>
              🏅 You earned the Mindful Owl badge!
            </div>
          </div>
        )}
      </div>

      <div style={styles.emergencyBox}>
        Is this an emergency?
        <Link to="/alertsResources" style={styles.navLink}>
          Alerts & Resources
        </Link>
      </div>
    </div>
  );
}