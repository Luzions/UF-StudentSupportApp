import React, { useState, useEffect } from 'react';
import gatorLogo from '../assets/gator-logo.png';
import ufLogo from '../assets/uf-logo.png';
import backgroundImage from '../assets/1-everglades-florida.png';
import axios from 'axios';

function getCookie(name) {
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith(name + '='));
  return cookieValue ? cookieValue.split('=')[1] : null;
}

const GpaTracker = () => {
  const [cumulativeGpa, setCumulativeGpa] = useState(null);
  const [grades, setGrades] = useState(Array(6).fill(''));
  const [credits, setCredits] = useState(Array(6).fill(3));
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      console.warn('Username missing from localStorage. Make sure user is logged in.');
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

      if (profile && profile.cumulative_gpa !== null) {
        setCumulativeGpa(parseFloat(profile.cumulative_gpa));
      } else {
        setError('GPA not found or profile incomplete.');
      }
    })
    .catch(err => {
      console.error('Error fetching profile:', err);
      setError('Failed to load GPA data.');
    });
  }, []);

  const handleGradeChange = (idx, value) => {
    const newGrades = [...grades];
    newGrades[idx] = value;
    setGrades(newGrades);
  };

  const handleCreditChange = (idx, value) => {
    const newCredits = [...credits];
    newCredits[idx] = parseInt(value, 10);
    setCredits(newCredits);
  };

  const validInputs = grades
    .map((g, i) => ({ grade: parseFloat(g), credit: credits[i] }))
    .filter(item => !isNaN(item.grade) && item.credit > 0);

  const totalCredits = validInputs.reduce((sum, item) => sum + item.credit, 0);
  const totalPoints = validInputs.reduce((sum, item) => sum + item.grade * item.credit, 0);
  const semesterGpa = totalCredits > 0 ? totalPoints / totalCredits : null;
  const combinedGpa = semesterGpa !== null && cumulativeGpa !== null
    ? (cumulativeGpa + semesterGpa) / 2
    : null;

  return (
    <div style={styles.pageBackground}>
      <div style={styles.container}>
        <h2 style={styles.title}>📘 GPA Tracker</h2>
        <p style={styles.subtext}>
          Your current cumulative GPA:{' '}
          <strong>
            {cumulativeGpa !== null
              ? cumulativeGpa.toFixed(2)
              : error || 'Loading...'}
          </strong>
        </p>

        {grades.map((grade, i) => (
          <div key={i} style={styles.inputRow}>
            <label style={styles.label}>Course {String.fromCharCode(65 + i)}:</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="4"
              value={grade}
              placeholder="GPA"
              onChange={e => handleGradeChange(i, e.target.value)}
              style={styles.input}
            />
            <select
              value={credits[i]}
              onChange={e => handleCreditChange(i, e.target.value)}
              style={styles.select}
            >
              {[1, 2, 3, 4].map(val => (
                <option key={val} value={val}>{val} credits</option>
              ))}
            </select>
          </div>
        ))}

        {semesterGpa !== null && (
          <div style={styles.resultBox}>
            <p><strong>Semester GPA:</strong> {semesterGpa.toFixed(2)}</p>
            {combinedGpa !== null && (
              <p><strong>Projected Cumulative GPA:</strong> {combinedGpa.toFixed(2)}</p>
            )}
          </div>
        )}

        <div style={styles.logoFooter}>
          <img src={gatorLogo} alt="Gator Logo" style={styles.logoLeft} />
          <img src={ufLogo} alt="UF Logo" style={styles.logoRight} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageBackground: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '2rem',
    boxSizing: 'border-box',
  },
  container: {
    maxWidth: '750px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    fontFamily: 'Inter, sans-serif',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#0021A5',
  },
  subtext: {
    fontSize: '1rem',
    marginBottom: '1.5rem',
    color: '#1e293b',
  },
  inputRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  },
  label: {
    width: '100px',
    fontWeight: '600',
    color: '#1e293b',
  },
  input: {
    flexGrow: 1,
    padding: '0.4rem',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
  },
  select: {
    padding: '0.4rem',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
  },
  resultBox: {
    marginTop: '2rem',
    paddingTop: '1rem',
    borderTop: '1px solid #e2e8f0',
    fontSize: '1.1rem',
    color: '#1e293b',
  },
  logoFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '3rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid #e2e8f0',
  },
  logoLeft: {
    height: '50px',
  },
  logoRight: {
    height: '50px',
  },
};

export default GpaTracker;