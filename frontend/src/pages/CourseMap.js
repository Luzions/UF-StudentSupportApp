// src/pages/CourseMap.js
import React from "react";
import { useNavigate } from "react-router-dom";

// Role icon imports
import studentRoleIcon from "../assets/student-role-icon.png";

export default function CourseMap() {
  // Get user data from localStorage
  const fullName = localStorage.getItem("full_name");
  const role = localStorage.getItem("role");
  const college = localStorage.getItem("college");
  const major = "Pre-Medicine"; // Since Luna is in College of Medicine

  const navigate = useNavigate();

  const completedCourses = [
    { code: "CHM2045", name: "General Chemistry 1", credits: 3, grade: "A" },
    { code: "CHM2046", name: "General Chemistry 2", credits: 3, grade: "A-" },
    {
      code: "MAC2311",
      name: "Analytic Geometry and Calculus 1",
      credits: 4,
      grade: "B+",
    },
    {
      code: "MAC2312",
      name: "Analytic Geometry and Calculus 2",
      credits: 4,
      grade: "B",
    },
    {
      code: "BSC2010",
      name: "Integrated Principles of Biology 1",
      credits: 3,
      grade: "A",
    },
    { code: "PSY2012", name: "General Psychology", credits: 3, grade: "A" }, // Replacing ENC1101
  ];

  const currentCourses = [
    {
      code: "BSC2011",
      name: "Integrated Principles of Biology 2",
      credits: 3,
      professor: "Dr. Garcia",
    },
    {
      code: "PHY2048",
      name: "Physics with Calculus 1",
      credits: 3,
      professor: "Dr. Martinez",
    },
    {
      code: "STA2023",
      name: "Introduction to Statistics 1",
      credits: 3,
      professor: "Dr. Kim",
    },
    {
      code: "ENC1102",
      name: "Argument and Persuasion",
      credits: 3,
      professor: "Dr. Thompson",
    },
  ];

  const nextSemesterCourses = [
    { code: "PHY2049", name: "Physics with Calculus 2", credits: 3 },
    { code: "CHM2210", name: "Organic Chemistry 1", credits: 3 },
    { code: "AMH2010", name: "United States to 1877", credits: 3 },
    { code: "SYG2000", name: "Principles of Sociology", credits: 3 }, // Added Sociology for MCAT
  ];
  // Calculate totals
  const completedCredits = completedCourses.reduce(
    (sum, course) => sum + course.credits,
    0
  );
  const currentCredits = currentCourses.reduce(
    (sum, course) => sum + course.credits,
    0
  );
  const totalCredits = completedCredits + currentCredits;
  const progressPercentage = (completedCredits / 120) * 100;

  // Handlers
  const handleLogout = () => {
    localStorage.clear();
    navigate("/logged-out");
  };

  const handleBackToDashboard = () => {
    navigate(`/${role}-dashboard`);
  };

  // Styles
  const styles = {
    container: {
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      background: "linear-gradient(135deg, #FA4616 0%, #0021A5 100%)",
      minHeight: "100vh",
      padding: "1rem",
    },
    topBar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      padding: "1rem 1.5rem",
      borderRadius: "12px",
      backdropFilter: "blur(10px)",
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
    },
    roleIcon: {
      width: "24px",
      height: "24px",
    },
    userName: {
      fontWeight: "600",
      fontSize: "1rem",
    },
    topLinks: {
      display: "flex",
      gap: "1rem",
    },
    topLink: {
      color: "#ffffff",
      cursor: "pointer",
      fontWeight: "500",
      padding: "0.5rem 1rem",
      borderRadius: "6px",
      backgroundColor: "transparent",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    },
    content: {
      maxWidth: "1200px",
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      padding: "2rem",
      margin: "0 auto",
    },
    header: {
      textAlign: "center",
      marginBottom: "2rem",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "700",
      color: "#0021A5",
      marginBottom: "0.5rem",
    },
    subtitle: {
      fontSize: "1.1rem",
      color: "#64748b",
      marginBottom: "1rem",
    },
    majorInfo: {
      fontSize: "1.2rem",
      fontWeight: "600",
      color: "#FA4616",
      marginBottom: "1.5rem",
    },
    progressSection: {
      backgroundColor: "#f8fafc",
      padding: "1.5rem",
      borderRadius: "12px",
      marginBottom: "2rem",
      textAlign: "center",
    },
    progressBar: {
      width: "100%",
      height: "12px",
      backgroundColor: "#e2e8f0",
      borderRadius: "6px",
      overflow: "hidden",
      marginBottom: "1rem",
    },
    progressFill: {
      height: "100%",
      backgroundColor: "#10B981",
      borderRadius: "6px",
    },
    progressText: {
      fontSize: "1rem",
      color: "#64748b",
    },
    courseSections: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "2rem",
      marginTop: "2rem",
    },
    courseSection: {
      backgroundColor: "#ffffff",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      padding: "1.5rem",
    },
    sectionTitle: {
      fontSize: "1.3rem",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "1rem",
      textAlign: "center",
    },
    courseList: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
    },
    courseItem: {
      padding: "1rem",
      backgroundColor: "#f8fafc",
      borderRadius: "8px",
      border: "1px solid #e2e8f0",
    },
    courseCode: {
      fontSize: "0.9rem",
      fontWeight: "600",
      color: "#0021A5",
    },
    courseName: {
      fontSize: "0.9rem",
      color: "#374151",
      marginTop: "0.25rem",
    },
    courseDetails: {
      fontSize: "0.8rem",
      color: "#64748b",
      marginTop: "0.25rem",
    },
    gradeGood: {
      color: "#10B981",
      fontWeight: "600",
      float: "right",
    },
    creditsInfo: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "1rem",
      marginTop: "2rem",
      padding: "1rem",
      backgroundColor: "#f1f5f9",
      borderRadius: "8px",
    },
    creditsStat: {
      textAlign: "center",
    },
    creditsLabel: {
      fontSize: "0.9rem",
      color: "#64748b",
      fontWeight: "500",
    },
    creditsValue: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#1e293b",
      marginTop: "0.25rem",
    },
  };

  return (
    <div style={styles.container}>
      {/* Top Navigation */}
      <div style={styles.topBar}>
        <div style={styles.userInfo}>
          <div style={styles.userAvatar}>
            <img src={studentRoleIcon} alt="Student" style={styles.roleIcon} />
          </div>
          <div>
            <div style={styles.userName}>{fullName}</div>
            <div style={{ fontSize: "0.875rem", opacity: "0.8" }}>Student</div>
          </div>
        </div>

        <div style={styles.topLinks}>
          <button style={styles.topLink} onClick={handleBackToDashboard}>
            ← Back to Dashboard
          </button>
          <button style={styles.topLink} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        {/* Header */}
        <header style={styles.header}>
          <h1 style={styles.title}>Course Mapping</h1>
          <p style={styles.subtitle}>
            Track your academic progress and plan future courses
          </p>
          <div style={styles.majorInfo}>
            {major} - {college}
          </div>
        </header>

        {/* Progress Section */}
        <div style={styles.progressSection}>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${progressPercentage}%`,
              }}
            ></div>
          </div>
          <div style={styles.progressText}>
            {completedCredits} of 120 credits completed (
            {Math.round(progressPercentage)}%)
          </div>
        </div>

        {/* Credits Info */}
        <div style={styles.creditsInfo}>
          <div style={styles.creditsStat}>
            <div style={styles.creditsLabel}>Completed</div>
            <div style={styles.creditsValue}>{completedCredits}</div>
          </div>
          <div style={styles.creditsStat}>
            <div style={styles.creditsLabel}>In Progress</div>
            <div style={styles.creditsValue}>{currentCredits}</div>
          </div>
          <div style={styles.creditsStat}>
            <div style={styles.creditsLabel}>Total</div>
            <div style={styles.creditsValue}>{totalCredits}</div>
          </div>
        </div>

        {/* Course Sections */}
        <div style={styles.courseSections}>
          {/* Completed Courses */}
          <div style={styles.courseSection}>
            <h3 style={styles.sectionTitle}>Completed Courses</h3>
            <div style={styles.courseList}>
              {completedCourses.map((course, index) => (
                <div key={index} style={styles.courseItem}>
                  <div style={styles.courseCode}>
                    {course.code}
                    <span style={styles.gradeGood}>{course.grade}</span>
                  </div>
                  <div style={styles.courseName}>{course.name}</div>
                  <div style={styles.courseDetails}>
                    {course.credits} credits
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Courses */}
          <div style={styles.courseSection}>
            <h3 style={styles.sectionTitle}>Current Courses</h3>
            <div style={styles.courseList}>
              {currentCourses.map((course, index) => (
                <div key={index} style={styles.courseItem}>
                  <div style={styles.courseCode}>{course.code}</div>
                  <div style={styles.courseName}>{course.name}</div>
                  <div style={styles.courseDetails}>
                    {course.professor} • {course.credits} credits
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Semester */}
          <div style={styles.courseSection}>
            <h3 style={styles.sectionTitle}>Next Semester (Fall 2025)</h3>
            <div style={styles.courseList}>
              {nextSemesterCourses.map((course, index) => (
                <div key={index} style={styles.courseItem}>
                  <div style={styles.courseCode}>{course.code}</div>
                  <div style={styles.courseName}>{course.name}</div>
                  <div style={styles.courseDetails}>
                    {course.credits} credits
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
