import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/logo-Image.jpg";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in:", username);
    navigate("/");
  };

  const styles = {
    container: {
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      background: "linear-gradient(to right, #FA4616, #0021A5)",
      padding: "2rem",
      boxSizing: "border-box",
    },
    card: {
      width: "100%",
      maxWidth: "500px",
      background: "linear-gradient(to bottom, #FF6A00 0%, #0057B8 100%)",
      borderRadius: "20px",
      padding: "2.5rem 3rem",
      boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: "#fff",
    },
    logo: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "4px solid white",
      backgroundColor: "#fff",
      marginBottom: "1.8rem",
    },
    heading: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "0.4rem",
    },
    subheading: {
      fontSize: "1rem",
      marginBottom: "2rem",
    },
    input: {
      width: "100%",
      padding: "0.8rem",
      margin: "0.6rem 0",
      borderRadius: "8px",
      border: "none",
      fontSize: "1rem",
    },
    button: {
      background: "linear-gradient(to right, #36D1DC, #5B86E5)",
      border: "none",
      padding: "1rem",
      width: "100%",
      borderRadius: "8px",
      color: "white",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "1.3rem",
    },
    smallRow: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      marginTop: "0.5rem",
      fontSize: "0.9rem",
      color: "#f0f0f0",
    },
    link: {
      color: "#cce0ff",
      textDecoration: "none",
      fontSize: "0.9rem",
    },
    signup: {
      marginTop: "1.5rem",
      fontSize: "0.9rem",
      color: "#eee",
    },
    footer: {
      marginTop: "2rem",
      color: "#ccc",
      fontSize: "0.85rem",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src={logoImg} alt="UF Logo" style={styles.logo} />
        <h2 style={styles.heading}>University of Florida</h2>
        <p style={styles.subheading}>Login to UF-SWSC</p>

        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            style={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div style={styles.smallRow}>
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" style={styles.link}>
              Forgot password?
            </a>
          </div>

          <button type="submit" style={styles.button}>
            → Sign In
          </button>
        </form>

        <div style={styles.signup}>
          Don’t have an account?{" "}
          <Link to="/register" style={styles.link}>
            Sign up here
          </Link>
        </div>
      </div>

      <p style={styles.footer}>
        © 2025 University of Florida – Software Security Center
      </p>
    </div>
  );
}
