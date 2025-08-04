import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CourseMapping() {
  const [semesters, setSemesters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "#e0f2fe";
    document.documentElement.style.backgroundColor = "#e0f2fe";
  }, []);

  const addSemester = () => {
    setSemesters([
      ...semesters,
      {
        id: Date.now(),
        name: `Semester ${semesters.length + 1}`,
        courses: [],
      },
    ]);
  };

  const addCourse = (semesterId, course) => {
    setSemesters((prev) =>
      prev.map((semester) =>
        semester.id === semesterId
          ? { ...semester, courses: [...semester.courses, course] }
          : semester
      )
    );
  };

  const styles = {
    container: {
      fontFamily: "'Inter', sans-serif",
      backgroundColor: "#e0f2fe",
      minHeight: "100vh",
      padding: "2rem",
      position: "relative",
    },
    header: {
      textAlign: "center",
      marginBottom: "2.5rem",
      paddingBottom: "1rem",
      borderBottom: "1px solid #94a3b8",
      position: "relative",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "700",
      color: "#1e3a8a",
      marginBottom: "0.5rem",
    },
    subtitle: {
      fontSize: "1.15rem",
      color: "#475569",
      fontWeight: "400",
      margin: "0",
    },
    navButton: {
      position: "absolute",
      top: "1rem",
      right: "2rem",
      backgroundColor: "#1e3a8a",
      color: "#fff",
      padding: "0.6rem 1rem",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
    },
    button: {
      backgroundColor: "#2563eb",
      color: "#fff",
      padding: "0.75rem 1.25rem",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
      marginBottom: "2rem",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
    },
    semesterBox: {
      backgroundColor: "#ffffff",
      border: "2px solid #cbd5e1",
      borderRadius: "12px",
      padding: "1.5rem",
      marginBottom: "2rem",
      boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    },
    semesterTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      marginBottom: "1rem",
      color: "#0f172a",
    },
    courseBox: {
      backgroundColor: "#f0f9ff",
      border: "1px solid #38bdf8",
      borderRadius: "8px",
      padding: "1rem",
      marginBottom: "0.75rem",
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
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Course Mapping</h1>
        <p style={styles.subtitle}>
          Plan out your academic journey semester by semester
        </p>
        <button style={styles.navButton} onClick={() => navigate("/student-dashboard")}>
          ← Dashboard
        </button>
      </header>

      <button style={styles.button} onClick={addSemester}>
        ➕ Add Semester
      </button>

      {semesters.map((semester) => (
        <div key={semester.id} style={styles.semesterBox}>
          <div style={styles.semesterTitle}>{semester.name}</div>

          <CourseForm semesterId={semester.id} addCourse={addCourse} styles={styles} />

          {semester.courses.map((course, index) => (
            <div key={index} style={styles.courseBox}>
              <strong>{course.code}</strong>: {course.name} ({course.credits} credits)
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function CourseForm({ semesterId, addCourse, styles }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [credits, setCredits] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && code && credits) {
      addCourse(semesterId, { name, code, credits });
      setName("");
      setCode("");
      setCredits("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.courseInput}>
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
      <button type="submit" style={styles.submitButton}>
        Add Course
      </button>
    </form>
  );
}