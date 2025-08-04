// src/pages/Dashboard.js
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// ============= ICON =============
import studentRoleIcon from "../assets/student-role-icon.png";
import counselorRoleIcon from "../assets/counselor-role-icon.png";
import adminRoleIcon from "../assets/admin-role-icon.png";
import { getFeaturesByRole } from '../utils/roleFeatures';

export default function Dashboard() {
  const navigate = useNavigate();

  // ============= GET LOCAL STORAGE USER DATA =============
  const fullName = localStorage.getItem("full_name");
  const role = localStorage.getItem("role");
  const college = localStorage.getItem("college");
  const studentId = localStorage.getItem("student_id");
  const employeeId = localStorage.getItem("employee_id");
  const major = localStorage.getItem("major");
  const department = localStorage.getItem("department");
  const storedGpa = localStorage.getItem("gpa");
  const credits = localStorage.getItem("credits");
  const assignedStudents = localStorage.getItem("assigned_students");
  const totalUsers = localStorage.getItem("total_users");


  const navigate = useNavigate();

  // ============= AUTHENTICATION CHECK =============
  useEffect(() => {
    if (!fullName || !role) {
      navigate("/logged-out");
    }
  }, [fullName, role, navigate]);
  // ============= NEW STATE MANAGEMENT  =============
  const [userPreferences, setUserPreferences] = useState({
    theme: localStorage.getItem("theme") || "light",
    dashboardLayout: localStorage.getItem("dashboardLayout") || "grid",
    notifications: localStorage.getItem("notifications") === "true" || true,
  });

  // UI State
  const [currentTab, setCurrentTab] = useState("dashboard");

  // ============= USER PROFILE FETCHING =============
  const [userProfile, setUserProfile] = useState(null);

  const [selectedFeature, setSelectedFeature] = useState(null);
  const gpa = userProfile?.cumulative_gpa ?? storedGpa;


  // ============= MEMOIZED FEATURES BASED ON USER ROLE/DATA =============
  const features = useMemo(() => {
    const currentUser = {
      role,
      gpa: userProfile?.cumulative_gpa ?? storedGpa,
      credits,
      assignedStudents,
      totalUsers
    };
    return getFeaturesByRole(currentUser);
  }, [role, userProfile, storedGpa, credits, assignedStudents, totalUsers]);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      console.warn('Username missing from localStorage.');
      return;
    }

    axios.get('http://localhost:8000/users/user-profiles/', {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      const data = res.data;
      const profile = Array.isArray(data)
        ? data.find(p => p.username === storedUsername)
        : null;

      if (profile) {
        setUserProfile(profile);
      } else {
        console.warn('Profile not found for user:', storedUsername);
      }
    })
    .catch(err => {
      console.error('Error fetching profile:', err.response?.status, err.response?.data || err.message);
    });
  }, []);


// ============= GPA HANDLING moved to roleFeatures.js =============


// ============= ROLE-BASED FEATURES MOVED TO utils/roleFeatures.js =============

  // ============= HANDLERS =============
  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature);
    // Navigate to the feature route
    if (feature.route) {
      navigate(feature.route);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/logged-out");
  };

  // ============= STYLES =============
  const styles = {
    container: {
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      background: "linear-gradient(135deg, #FA4616 0%, #0021A5 100%)",
      minHeight: "100vh",
      padding: "1rem",
      boxSizing: "border-box",
    },
    topBar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      padding: "0.75rem 1.5rem",
      borderRadius: "12px",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    userInfo: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      color: "#ffffff",
    },
    userAvatar: {
      width: "40px",
      height: "40px",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "8px",
    },
    roleIcon: {
      width: "24px",
      height: "24px",
      objectFit: "contain",
    },
    userDetails: {
      display: "flex",
      flexDirection: "column",
    },
    userName: {
      fontWeight: "600",
      fontSize: "1rem",
    },
    userRole: {
      fontSize: "0.875rem",
      opacity: "0.8",
    },
    topLinks: {
      display: "flex",
      gap: "1.5rem",
      alignItems: "center",
    },
    topLink: {
      color: "#ffffff",
      cursor: "pointer",
      fontWeight: "500",
      textDecoration: "none",
      transition: "opacity 0.2s ease",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.5rem",
      borderRadius: "6px",
    },
    topLinkIcon: {
      width: "18px",
      height: "18px",
      objectFit: "contain",
    },
    timeDisplay: {
      color: "rgba(255, 255, 255, 0.8)",
      fontSize: "0.875rem",
    },
    content: {
      width: "100%",
      maxWidth: "1200px",
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      padding: "2.5rem",
      margin: "0 auto",
      boxSizing: "border-box",
    },
    header: {
      textAlign: "center",
      marginBottom: "2rem",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "700",
      color: "#0021A5",
      marginBottom: "1rem",
      lineHeight: "1.2",
    },
    roleInfoGrid: {
      display: "flex",
      justifyContent: "center",
      gap: "1.5rem",
      marginBottom: "1.5rem",
      flexWrap: "wrap",
    },
    infoCard: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "1rem 1.5rem",
      backgroundColor: "#f8fafc",
      borderRadius: "12px",
      border: "1px solid #e2e8f0",
      minWidth: "120px",
    },
    infoCardSpecial: {
      backgroundColor: "#f0f9ff",
      border: "1px solid #0ea5e9",
    },
    infoLabel: {
      fontSize: "0.875rem",
      color: "#64748b",
      fontWeight: "500",
      marginBottom: "0.25rem",
    },
    infoValue: {
      fontSize: "1.1rem",
      color: "#1e293b",
      fontWeight: "700",
    },
    infoValueSpecial: {
      color: "#0ea5e9",
    },
    divider: {
      height: "1px",
      width: "100%",
      backgroundColor: "#e2e8f0",
      marginTop: "1.5rem",
      marginBottom: "2rem",
    },
    featureGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      gap: "1.5rem",
      marginTop: "2rem",
    },
    featureCard: {
      backgroundColor: "#fefcfb",
      padding: "2rem",
      borderRadius: "16px",
      border: "1px solid #e2e8f0",
      boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
      transition: "all 0.3s ease",
      cursor: "pointer",
      position: "relative",
      overflow: "hidden",
    },
    featureCardHover: {
      transform: "translateY(-8px)",
      boxShadow: "0 20px 25px rgba(0,0,0,0.15)",
    },
    featureHeader: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      marginBottom: "1rem",
    },
    featureIconContainer: {
      padding: "0.75rem",
      borderRadius: "12px",
      backgroundColor: "#f8fafc",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    featureIcon: {
      width: "40px",
      height: "40px",
      objectFit: "contain",
    },
    featureTextContainer: {
      flex: "1",
    },
    featureTitle: {
      fontSize: "1.4rem",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "0.25rem",
    },
    featureStats: {
      fontSize: "0.875rem",
      fontWeight: "600",
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
    modal: {
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: "1000",
    },
    modalContent: {
      backgroundColor: "#ffffff",
      padding: "2rem",
      borderRadius: "16px",
      maxWidth: "500px",
      width: "90%",
      maxHeight: "80vh",
      overflowY: "auto",
    },
    modalHeader: {
      fontSize: "1.5rem",
      fontWeight: "700",
      marginBottom: "1rem",
      color: "#1e293b",
    },
    formGroup: {
      marginBottom: "1rem",
    },
    label: {
      display: "block",
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "#374151",
      marginBottom: "0.5rem",
    },
    select: {
      width: "100%",
      padding: "0.75rem",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      fontSize: "1rem",
    },
    checkbox: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    buttonGroup: {
      display: "flex",
      gap: "1rem",
      marginTop: "1.5rem",
    },
    button: {
      flex: "1",
      padding: "0.75rem 1.5rem",
      borderRadius: "8px",
      fontSize: "1rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s ease",
      border: "none",
    },
    buttonPrimary: {
      backgroundColor: "#0021A5",
      color: "#ffffff",
    },
    buttonSecondary: {
      backgroundColor: "#f3f4f6",
      color: "#374151",
    },
  };

  // ============= RENDER LOGIC =============
  const capitalizedRole = role
    ? role.charAt(0).toUpperCase() + role.slice(1)
    : "User";
  //const currentFeatures = roleFeatures[role] || []; // not needed while using useMemo

  // Get role icon
  const getRoleIcon = (role) => {
    switch (role) {
      case "student":
        return studentRoleIcon;
      case "counselor":
        return counselorRoleIcon;
      case "admin":
        return adminRoleIcon;
      default:
        return studentRoleIcon;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <div style={styles.userInfo}>
          <div style={styles.userAvatar}>
            <img
              src={getRoleIcon(role)}
              alt={`${role} icon`}
              style={styles.roleIcon}
            />
          </div>
          <div style={styles.userDetails}>
            <div style={styles.userName}>{fullName}</div>
            <div style={styles.userRole}>{capitalizedRole}</div>
          </div>
        </div>

        <div style={styles.topLinks}>
          <button
            style={styles.topLink}
            onClick={handleLogout}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        {/* Header Section*/}
        <header style={styles.header}>
          <h1 style={styles.title}>Welcome, {fullName}!</h1>

          {/* User info cards */}
          <div style={styles.roleInfoGrid}>
            <div style={styles.infoCard}>
              <span style={styles.infoLabel}>Role</span>
              <span style={styles.infoValue}>{capitalizedRole}</span>
            </div>
            <div style={styles.infoCard}>
              <span style={styles.infoLabel}>College</span>
              <span style={styles.infoValue}>{college}</span>
            </div>

            {/* show role-specific information */}
            {major && (
              <div style={styles.infoCard}>
                <span style={styles.infoLabel}>Major</span>
                <span style={styles.infoValue}>{major}</span>
              </div>
            )}
            {department && (
              <div style={styles.infoCard}>
                <span style={styles.infoLabel}>Department</span>
                <span style={styles.infoValue}>{department}</span>
              </div>
            )}
            {gpa && (
              <div style={{ ...styles.infoCard, ...styles.infoCardSpecial }}>
                <span style={styles.infoLabel}>GPA</span>
                <span
                  style={{ ...styles.infoValue, ...styles.infoValueSpecial }}
                >
                  {gpa}
                </span>
              </div>
            )}
            {assignedStudents && (
              <div style={{ ...styles.infoCard, ...styles.infoCardSpecial }}>
                <span style={styles.infoLabel}>Assigned Students</span>
                <span
                  style={{ ...styles.infoValue, ...styles.infoValueSpecial }}
                >
                  {assignedStudents}
                </span>
              </div>
            )}
            {totalUsers && (
              <div style={{ ...styles.infoCard, ...styles.infoCardSpecial }}>
                <span style={styles.infoLabel}>Total Users</span>
                <span
                  style={{ ...styles.infoValue, ...styles.infoValueSpecial }}
                >
                  {totalUsers}
                </span>
              </div>
            )}
            {studentId && (
              <div style={styles.infoCard}>
                <span style={styles.infoLabel}>Student ID</span>
                <span style={styles.infoValue}>{studentId}</span>
              </div>
            )}
            {employeeId && (
              <div style={styles.infoCard}>
                <span style={styles.infoLabel}>Employee ID</span>
                <span style={styles.infoValue}>{employeeId}</span>
              </div>
            )}
          </div>

          <div style={styles.divider}></div>
        </header>

        {/* Features Grid */}
        <div style={styles.featureGrid}>
          {features.map((feature, index) => (
            <div
              key={index}
              style={styles.featureCard}
              onClick={() => handleFeatureClick(feature)}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, styles.featureCardHover);
                e.currentTarget.style.borderLeftColor = feature.color;
                e.currentTarget.style.borderLeftWidth = "4px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
                e.currentTarget.style.borderLeftColor = "#e2e8f0";
                e.currentTarget.style.borderLeftWidth = "1px";
              }}
            >
              <div style={styles.featureTextContainer}>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                {feature.statsText && (
                  <div style={{ ...styles.featureStats, ...feature.statsStyle }}>
                    {feature.statsText}
                  </div>
                )}
              </div>
              <p style={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer style={styles.footer}>
          <p>
            Developed by Group 3 | University of Florida Intro to Software
            Engineering Project
          </p>
          <p style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}>
            Currently viewing: {capitalizedRole} Dashboard (
            {features.length} features available)
          </p>
        </footer>
      </div>
    </div>
  );
}
