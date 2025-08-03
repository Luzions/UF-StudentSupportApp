import { Link } from "react-router-dom";
import ufLogo from "../assets/uf-logo.png"; // Top-right UF logo
import gatorLogo from "../assets/gator-logo.png"; // Large left gator image

export default function HomePage() {
  const styles = {
    container: {
      fontFamily: "'Segoe UI', sans-serif",
      //backgroundColor: "#0021A5", // UF blue
      background: "linear-gradient(45deg, #003366, #1a1a2e, #000080)",
      color: "white",
      minHeight: "100vh",
      width: "100vw",
      margin: 0,
      padding: 0,
    },
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1.2rem 2rem",
    },
    navLinks: {
      display: "flex",
      gap: "1.8rem",
      fontWeight: "bold",
    },
    navLink: {
      color: "white",
      textDecoration: "none",
    },
    logo: {
      height: "80px",
      width: "auto",
      marginRight: "2rem",
    },
    main: {
      display: "flex",
      flexWrap: "nowrap",
      flexDirection: "row", // force row layout
      justifyContent: "center", //"space-evenly",
      alignItems: "center",
      gap: "6rem",
      padding: "2rem",
      width: "100%",
      height: "calc(100vh - 60px)",
      boxSizing: "border-box",
      margin: "0 auto",
    },
    gatorImage: {
      maxWidth: "650px",
      width: "100%",
      height: "auto",
      marginBottom: "1rem",
    },
    infoSection: {
      maxWidth: "600px",
      minwidth: "420px",
      textAlign: "left",
    },
    heading: {
      fontSize: "3rem",
      fontWeight: 700,
      color: "white",
      marginBottom: "1rem",
    },
    highlight: {
      color: "#FA4616", // UF orange
    },
    subtitle: {
      marginBottom: "1.2rem",
      fontSize: "1.4rem",
      fontWeight: 500,
      color: "white",
    },
    featureList: {
      listStyle: "none",
      padding: 0,
      marginBottom: "2.5rem",
      lineHeight: "2", // slightly more spacing
      fontSize: "1.3rem", // added font size
      fontWeight: 400,
      color: "white",
    },
    button: {
      backgroundColor: "#FA4616",
      color: "white",
      border: "none",
      padding: "0.8rem 1.8rem",
      fontSize: "1.05rem",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      {/* Top Navigation */}
      <header style={styles.navbar}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={ufLogo} alt="UF Logo" style={styles.logo} />
        </div>
        <nav style={styles.navLinks}>
          <Link to="/gpa" style={styles.navLink}>
            GPA Tracking
          </Link>
          <Link to="/calendarPage" style={styles.navLink}>
            Calendar
          </Link>
          <Link to="/wellness" style={styles.navLink}>
            Mental Wellness
          </Link>
          <Link to="/alertsResources" style={styles.navLink}>
            Alerts & Resources
          </Link>
          <Link to="/about" style={styles.navLink}>
            About
          </Link>

        </nav>
      </header>

      {/* Main content */}
      <main style={styles.main}>
        <div>
          <img src={gatorLogo} alt="Gator Logo" style={styles.gatorImage} />
        </div>

        <div style={styles.infoSection}>
          <h1 style={styles.heading}>
            Welcome to <span style={styles.highlight}>UF-SWSC</span>
          </h1>
          <p style={styles.subtitle}>
            The University of Florida’s Student Wellness and Success Companion
          </p>
          <ul style={styles.featureList}>
            <li>
              <span style={{ color: "#FA4616" }}>✔ </span> Track your GPA and
              academic progress
            </li>
            <li>
              <span style={{ color: "#FA4616" }}>✔ </span> Complete regular
              mental wellness check-ins
            </li>
            <li>
              <span style={{ color: "#FA4616" }}>✔ </span> Receive timely alerts
              and support resources
            </li>
            <li>
              <span style={{ color: "#FA4616" }}>✔ </span> View trends in your
              grades and wellbeing over time
            </li>
          </ul>
          <Link to="/login">
            <button style={styles.button}>Get Started</button>
          </Link>
        </div>
      </main>
    </div>
  );
}
