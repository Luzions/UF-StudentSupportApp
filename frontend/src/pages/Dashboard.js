// src/pages/Dashboard.js
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

// ============= ICON =============
import studentRoleIcon from "../assets/student-role-icon.png";
import counselorRoleIcon from "../assets/counselor-role-icon.png";
import adminRoleIcon from "../assets/admin-role-icon.png";

export default function Dashboard() {
  // ============= GET REAL USER DATA FROM LOCALSTORAGE =============
  const fullName = localStorage.getItem("full_name");
  const role = localStorage.getItem("role");
  const college = localStorage.getItem("college");

  // Additional user data
  const studentId = localStorage.getItem("student_id");
  const employeeId = localStorage.getItem("employee_id");
  const major = localStorage.getItem("major");
  const year = localStorage.getItem("year");
  const department = localStorage.getItem("department");
  const specialization = localStorage.getItem("specialization");
  const accessLevel = localStorage.getItem("access_level");
  const gpa = localStorage.getItem("gpa");
  const credits = localStorage.getItem("credits");
  const assignedStudents = localStorage.getItem("assigned_students");
  const totalUsers = localStorage.getItem("total_users");

  const navigate = useNavigate();
  // ============= NEW STATE MANAGEMENT  =============
  const [userPreferences, setUserPreferences] = useState({
    theme: localStorage.getItem("theme") || "light",
    dashboardLayout: localStorage.getItem("dashboardLayout") || "grid",
    notifications: localStorage.getItem("notifications") === "true" || true,
  });

  // UI State
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [selectedFeature, setSelectedFeature] = useState(null);

  // ============= ROLE-BASED FEATURES  =============
  const roleFeatures = {
    student: [
      {
        title: "GPA Tracking",
        description:
          "Track your GPA and monitor course progress throughout your academic journey.",
        color: "#10B981",
        stats: gpa ? `Current GPA: ${gpa}` : "GPA not available",
        route: "/gpa-tracker",
      },
      {
        title: "Wellness Support",
        description:
          "Access mental health resources, mood tracking, and wellness check-ins.",
        color: "#8B5CF6",
        stats: "Last check-in: 2 days ago",
        route: "/alertsResources",
      },
      {
        title: "Course Mapping",
        description:
          "Plan your degree path with intelligent course recommendations and prerequisites.",
        color: "#F59E0B",
        stats: credits ? `${credits} credits` : "Credits not available",
        route: "/course-mapping",
      },
      {
        title: "Academic Calendar",
        description:
          "View important dates, deadlines, and schedule appointments with advisors.",
        color: "#EF4444",
        stats: "3 upcoming deadlines",
        route: "/calendar",
      },
    ],
    counselor: [
      {
        title: "Student Management",
        description:
          "View and manage your assigned students' academic progress and wellness.",
        color: "#3B82F6",
        stats: assignedStudents
          ? `${assignedStudents} assigned students`
          : "No students assigned",
        route: "/student-management",
      },
      {
        title: "Wellness Dashboard",
        description:
          "Monitor student wellness metrics and intervention recommendations.",
        color: "#10B981",
        stats: "12 students need attention",
        route: "/alertsResources",
      },
      {
        title: "Appointment Scheduling",
        description:
          "Manage your calendar and schedule meetings with students.",
        color: "#F59E0B",
        stats: "8 appointments this week",
        route: "/appointments",
      },
      {
        title: "Resource Library",
        description:
          "Access counseling resources, guides, and intervention strategies.",
        color: "#8B5CF6",
        stats: "127 resources available",
        route: "/resources",
      },
      {
        title: "Reports & Analytics",
        description:
          "Generate reports on student progress and wellness trends.",
        color: "#EF4444",
        stats: "5 reports pending",
        route: "/reports",
      },
    ],
    admin: [
      {
        title: "User Management",
        description:
          "Manage student, counselor, and admin accounts across the system.",
        color: "#6B7280",
        stats: totalUsers
          ? `${totalUsers} total users`
          : "User count not available",
        route: "/user-management",
      },
      {
        title: "System Analytics",
        description:
          "View comprehensive analytics across all users and departments.",
        color: "#3B82F6",
        stats: "98.7% system uptime",
        route: "/analytics",
      },
      {
        title: "College Management",
        description:
          "Manage college information, departments, and organizational structure.",
        color: "#10B981",
        stats: "16 colleges active",
        route: "/college-management",
      },
      {
        title: "Course Catalog",
        description:
          "Manage course offerings, prerequisites, and academic requirements.",
        color: "#F59E0B",
        stats: "2,347 courses listed",
        route: "/course-catalog",
      },
      {
        title: "System Settings",
        description:
          "Configure system-wide settings, permissions, and security.",
        color: "#8B5CF6",
        stats: "All systems operational",
        route: "/system-settings",
      },
      {
        title: "Backup & Security",
        description:
          "Manage data backups, security protocols, and system maintenance.",
        color: "#EF4444",
        stats: "Daily backup: Complete",
        route: "/security",
      },
    ],
  };

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
    navigate("/login");
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
  const currentFeatures = roleFeatures[role] || [];

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
          {currentFeatures.map((feature, index) => (
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
                {feature.stats && (
                  <div style={{ ...styles.featureStats, color: feature.color }}>
                    {feature.stats}
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
            {currentFeatures.length} features available)
          </p>
        </footer>
      </div>
    </div>
  );
}
