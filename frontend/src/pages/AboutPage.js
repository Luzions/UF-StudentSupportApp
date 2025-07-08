import React, { useEffect } from "react";

export default function AboutPage() {
  useEffect(() => {
    document.body.style.backgroundColor = "#f8fafc";
    document.documentElement.style.backgroundColor = "#f8fafc";
  }, []);

  const styles = {
    container: {
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      backgroundColor: "#FA4616", //"#f8fafc",
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
      color: "#0021A5", //"#1e293b",
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
    featureGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "1.5rem",
      marginTop: "1.5rem",
    },
    featureCard: {
      backgroundColor: "#f8fafc",
      padding: "1.5rem",
      borderRadius: "8px",
      border: "1px solid #e2e8f0",
    },
    featureTitle: {
      fontSize: "1.1rem",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "0.5rem",
    },
    featureDescription: {
      fontSize: "1rem",
      color: "#64748b",
      lineHeight: "1.6",
    },
    highlight: {
      backgroundColor: "#f1f5f9",
      padding: "1.5rem",
      borderRadius: "8px",
      border: "1px solid #cbd5e1",
      marginTop: "1rem",
    },
    footer: {
      textAlign: "center",
      marginTop: "3rem",
      paddingTop: "2rem",
      borderTop: "1px solid #e2e8f0",
      color: "#64748b",
      fontSize: "1rem",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <header style={styles.header}>
          <h1 style={styles.title}>Student Support & Wellness Platform</h1>
          <p style={styles.subtitle}>
            Empowering student success through integrated academic planning and
            wellness support
          </p>
        </header>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.sectionTitleAccent}></span>
            Our Mission
          </h2>
          <p style={styles.paragraph}>
            We believe every student deserves the tools and support they need to
            thrive academically and personally. Our platform combines essential
            academic planning resources with comprehensive wellness tracking to
            create a holistic support system that adapts to each student's
            unique journey.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.sectionTitleAccent}></span>
            What We Offer
          </h2>
          <div style={styles.featureGrid}>
            <div style={styles.featureCard}>
              <h3 style={styles.featureTitle}>Academic Excellence</h3>
              <p style={styles.featureDescription}>
                Track your GPA, monitor course progress, and plan your degree
                path with intelligent insights and recommendations.
              </p>
            </div>
            <div style={styles.featureCard}>
              <h3 style={styles.featureTitle}>Wellness Support</h3>
              <p style={styles.featureDescription}>
                Regular check-ins, mood tracking, and resources to support your
                mental health and overall well-being.
              </p>
            </div>
            <div style={styles.featureCard}>
              <h3 style={styles.featureTitle}>Crisis Resources</h3>
              <p style={styles.featureDescription}>
                24/7 access to crisis support, anonymous reporting, and
                immediate connection to counseling services.
              </p>
            </div>
            <div style={styles.featureCard}>
              <h3 style={styles.featureTitle}>Secure Access</h3>
              <p style={styles.featureDescription}>
                Role-based access for students, staff, and counselors with
                industry-standard security and privacy protection.
              </p>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.sectionTitleAccent}></span>
            Privacy & Security
          </h2>
          <p style={styles.paragraph}>
            Your privacy is our priority. All data is encrypted and stored
            securely, with access strictly controlled according to your
            preferences. We comply with FERPA regulations and follow best
            practices for educational technology platforms.
          </p>
          <div style={styles.highlight}>
            <p style={styles.paragraph}>
              <strong>Your data belongs to you.</strong> We only share
              information with your explicit consent and provide full
              transparency about how your data is used to improve your academic
              and wellness experience.
            </p>
          </div>
        </section>

        <footer style={styles.footer}>
          <p>
            Developed by Group 3 | University of Florida Intro to Software
            Engineering Project
          </p>
        </footer>
      </div>
    </div>
  );
}
