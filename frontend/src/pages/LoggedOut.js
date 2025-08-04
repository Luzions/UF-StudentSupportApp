// src/pages/LoggedOut.js
import React from "react";
import { useNavigate } from "react-router-dom";

import loggedOutIcon from "../assets/logged-out-icon.png";
export default function LoggedOut() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        background: "linear-gradient(135deg, #FA4616 0%, #0021A5 100%)",
        minHeight: "100vh",
        padding: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
          padding: "3rem",
          textAlign: "center",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1.5rem",
          }}
        >
          <img
            src={loggedOutIcon}
            alt="Logged Out"
            style={{
              width: "80px",
              height: "80px",
              objectFit: "contain",
            }}
          />
        </div>

        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "#0021A5",
            marginBottom: "1rem",
          }}
        >
          You are logged out
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#64748b",
            marginBottom: "2rem",
            lineHeight: "1.6",
          }}
        >
          Your session has expired or you have been logged out. Please log back
          in to access your dashboard.
        </p>
        <button
          style={{
            backgroundColor: "#0021A5",
            color: "#ffffff",
            border: "none",
            padding: "1rem 2rem",
            borderRadius: "8px",
            fontSize: "1.1rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onClick={() => navigate("/login")}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#001a8a")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#0021A5")}
        >
          Log Back In
        </button>
        <div
          style={{
            marginTop: "2rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid #e2e8f0",
            fontSize: "0.9rem",
            color: "#64748b",
          }}
        >
          <p>
            Need help?{" "}
            <a
              href="/about"
              style={{ color: "#0021A5", textDecoration: "none" }}
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
