import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Role icon imports
import studentRoleIcon from "../assets/student-role-icon.png";

export default function CourseMap() {
  // State for next semester courses and future planning
  const [nextSemesterCourses, setNextSemesterCourses] = useState([
    { code: "PHY2049", name: "Physics with Calculus 2", credits: 3 },
    { code: "CHM2210", name: "Organic Chemistry 1", credits: 3 },
    { code: "AMH2010", name: "United States to 1877", credits: 3 },
    { code: "SYG2000", name: "Principles of Sociology", credits: 3 },
  ]);
  const [plannedSemesters, setPlannedSemesters] = useState([]);

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

  // Calculate totals
  const completedCredits = completedCourses.reduce(
    (sum, course) => sum + course.credits,
    0
  );
  const currentCredits = currentCourses.reduce(
    (sum, course) => sum + course.credits,
    0
  );
  const nextSemesterCredits = nextSemesterCourses.reduce(
    (sum, course) => sum + parseInt(course.credits || 0),
    0
  );
  const plannedCredits = plannedSemesters.reduce(
    (sum, semester) =>
      sum +
      semester.courses.reduce(
        (semSum, course) => semSum + parseInt(course.credits || 0),
        0
      ),
    0
  );
  const totalCredits =
    completedCredits + currentCredits + nextSemesterCredits + plannedCredits;
  const progressPercentage = (completedCredits / 120) * 100;

  // Planning functions
  const addCourseToNextSemester = (course) => {
    setNextSemesterCourses((prev) => [
      ...prev,
      { ...course, credits: parseInt(course.credits) },
    ]);
  };

  const removeCourseFromNextSemester = (courseIndex) => {
    setNextSemesterCourses((prev) =>
      prev.filter((_, index) => index !== courseIndex)
    );
  };

  const addSemester = () => {
    setPlannedSemesters([
      ...plannedSemesters,
      {
        id: Date.now(),
        name: `Future Semester ${plannedSemesters.length + 1}`,
        courses: [],
      },
    ]);
  };

  const addCourse = (semesterId, course) => {
    setPlannedSemesters((prev) =>
      prev.map((semester) =>
        semester.id === semesterId
          ? { ...semester, courses: [...semester.courses, course] }
          : semester
      )
    );
  };

  const removeSemester = (semesterId) => {
    setPlannedSemesters((prev) =>
      prev.filter((semester) => semester.id !== semesterId)
    );
  };

  const removeCourse = (semesterId, courseIndex) => {
    setPlannedSemesters((prev) =>
      prev.map((semester) =>
        semester.id === semesterId
          ? {
              ...semester,
              courses: semester.courses.filter(
                (_, index) => index !== courseIndex
              ),
            }
          : semester
      )
    );
  };

  // Handlers
  const handleLogout = () => {
    console.log("Logout clicked");
  };

  const handleBackToDashboard = () => {
    navigate('/student-dashboard');
    console.log("Back to dashboard clicked");
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
      fontSize: "1.2rem",
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
    creditsInfo: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
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
    courseSections: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "2rem",
      marginTop: "2rem",
      marginBottom: "3rem",
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
      position: "relative",
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
    planningSection: {
      borderTop: "2px solid #e5e7eb",
      paddingTop: "2rem",
    },
    planningHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "2rem",
    },
    planningTitle: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "#0021A5",
    },
    addButton: {
      backgroundColor: "#2563eb",
      color: "#fff",
      padding: "0.75rem 1.25rem",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "0.9rem",
    },
    semesterBox: {
      backgroundColor: "#ffffff",
      border: "2px solid #cbd5e1",
      borderRadius: "12px",
      padding: "1.5rem",
      marginBottom: "2rem",
      boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    },
    semesterHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem",
    },
    semesterTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#0f172a",
    },
    removeButton: {
      backgroundColor: "#ef4444",
      color: "#fff",
      padding: "0.25rem 0.5rem",
      borderRadius: "4px",
      border: "none",
      cursor: "pointer",
      fontSize: "0.8rem",
    },
    courseInput: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      marginBottom: "1rem",
    },
    input: {
      padding: "0.5rem",
      border: "1px solid #cbd5e1",
      borderRadius: "6px",
      fontSize: "0.9rem",
    },
    submitButton: {
      backgroundColor: "#0ea5e9",
      color: "#fff",
      padding: "0.5rem 1rem",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
      width: "fit-content",
      fontSize: "0.9rem",
    },
    plannedCourseItem: {
      padding: "1rem",
      backgroundColor: "#f0f9ff",
      border: "1px solid #38bdf8",
      borderRadius: "8px",
      marginBottom: "0.75rem",
      position: "relative",
    },
    removeCourseButton: {
      position: "absolute",
      top: "0.5rem",
      right: "0.5rem",
      backgroundColor: "#ef4444",
      color: "#fff",
      border: "none",
      borderRadius: "50%",
      width: "20px",
      height: "20px",
      cursor: "pointer",
      fontSize: "0.7rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  return (
    <div style={styles.container}>
      {/* Top Navigation */}
      <div style={styles.topBar}>
        <div style={styles.userInfo}>
          <div style={styles.userAvatar}>👨‍🎓</div>
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
            <div style={styles.creditsLabel}>Planned</div>
            <div style={styles.creditsValue}>
              {nextSemesterCredits + plannedCredits}
            </div>
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
                  <button
                    style={styles.removeCourseButton}
                    onClick={() => removeCourseFromNextSemester(index)}
                  >
                    ×
                  </button>
                  <div style={styles.courseCode}>{course.code}</div>
                  <div style={styles.courseName}>{course.name}</div>
                  <div style={styles.courseDetails}>
                    {course.credits} credits
                  </div>
                </div>
              ))}
            </div>

            {/* Add course form directly in Next Semester section */}
            <div
              style={{
                marginTop: "1rem",
                padding: "1rem",
                backgroundColor: "#f0f9ff",
                borderRadius: "8px",
                border: "1px dashed #38bdf8",
              }}
            >
              <div
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  color: "#0369a1",
                  marginBottom: "0.5rem",
                }}
              >
                Add Course to Fall 2025
              </div>
              <NextSemesterCourseForm
                addCourse={addCourseToNextSemester}
                styles={styles}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NextSemesterCourseForm({ addCourse, styles }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [credits, setCredits] = useState("");

  const handleSubmit = () => {
    if (name && code && credits) {
      addCourse({ name, code, credits });
      setName("");
      setCode("");
      setCredits("");
    }
  };

  return (
    <div style={styles.courseInput}>
      <input
        type="text"
        placeholder="Course Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Course Code (e.g. CEN 3031)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={styles.input}
      />
      <input
        type="number"
        placeholder="Credits"
        value={credits}
        onChange={(e) => setCredits(e.target.value)}
        style={styles.input}
      />
      <button type="button" style={styles.submitButton} onClick={handleSubmit}>
        Add Course
      </button>
    </div>
  );
}

function CourseForm({ semesterId, addCourse, styles }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [credits, setCredits] = useState("");

  const handleSubmit = () => {
    if (name && code && credits) {
      addCourse(semesterId, { name, code, credits });
      setName("");
      setCode("");
      setCredits("");
    }
  };

  return (
    <div style={styles.courseInput}>
      <input
        type="text"
        placeholder="Course Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Course Code (e.g. CEN 3031)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={styles.input}
      />
      <input
        type="number"
        placeholder="Credits"
        value={credits}
        onChange={(e) => setCredits(e.target.value)}
        style={styles.input}
      />
      <button type="button" style={styles.submitButton} onClick={handleSubmit}>
        Add Course
      </button>
    </div>
  );
}
