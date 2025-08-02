import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [collegeFilter, setCollegeFilter] = useState('');
  const [availableColleges, setAvailableColleges] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      setLoading(false);
      return;
    }

    axios.get('http://localhost:8000/users/user-profiles/', {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => {
      const allProfiles = Array.isArray(res.data) ? res.data : [];
      setProfiles(allProfiles);
      const me = allProfiles.find(p => p.username === storedUsername);
      setCurrentUser(me);
      const colleges = [...new Set(allProfiles.map(p => p.college).filter(Boolean))];
      setAvailableColleges(colleges);
      setCollegeFilter(me?.college || colleges[0] || '');
      setLoading(false);
    })
    .catch(err => {
      setError('Failed to load user data.');
      setLoading(false);
    });
  }, []);

  const isCounselor = currentUser?.role.toLowerCase() === 'counselor';

  const visibleProfiles = profiles.filter(p => {
    const sameCollege = p.college === collegeFilter;
    const notSelf = p.username !== currentUser?.username;
    const isRelevantRole = ['student', 'counselor'].includes(p.role.toLowerCase());
    return sameCollege && notSelf && isRelevantRole;
  });

  const sortedProfiles = [...visibleProfiles].sort((a, b) => a.username.localeCompare(b.username));

  const handleUpdate = (username, field, value) => {
    axios.patch(`http://localhost:8000/users/update/${username}/`, {
      [field]: value
    }, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    })
    .then(() => {
      setProfiles(prev =>
        prev.map(p => p.username === username ? { ...p, [field]: value } : p)
      );
    });
  };

  const handleDelete = (username) => {
    if (!window.confirm(`Are you sure you want to delete ${username}?`)) return;

    axios.delete(`http://localhost:8000/users/delete/${username}/`, {
      withCredentials: true,
    }).then(() => {
      setProfiles(prev => prev.filter(p => p.username !== username));
    });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ color: '#FA4616' }}>
        {isCounselor ? 'Student Management' : 'Your Profile'}
      </h1>

      {isCounselor && (
        <div style={{ marginBottom: '1rem' }}>
          <label>Select College:</label>
          <select
            value={collegeFilter}
            onChange={(e) => setCollegeFilter(e.target.value)}
            style={{ marginLeft: '0.5rem' }}
          >
            {availableColleges.map(college => (
              <option key={college} value={college}>{college}</option>
            ))}
          </select>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : sortedProfiles.length === 0 ? (
        <p>No profiles to display.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {sortedProfiles.map(profile => (
            <li key={profile.username} style={{
              background: '#1a1a2e',
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: '8px',
              color: 'white',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            }}>
              <h2>{profile.username}</h2>
              <p><strong>Role:</strong> {profile.role}</p>
              <p><strong>Email:</strong> {profile.email}</p>

              <p>
                <strong>GPA:</strong>{' '}
                {isCounselor ? (
                  <input
                    type="number"
                    step="0.01"
                    value={profile.cumulative_gpa ?? ''}
                    onChange={(e) =>
                      handleUpdate(profile.username, 'cumulative_gpa', parseFloat(e.target.value))
                    }
                    style={{ width: '80px' }}
                  />
                ) : profile.cumulative_gpa ?? 'Not available'}
              </p>

              <p>
                <strong>Department:</strong>{' '}
                {isCounselor ? (
                  <input
                    type="text"
                    value={profile.department ?? ''}
                    onChange={(e) =>
                      handleUpdate(profile.username, 'department', e.target.value)
                    }
                    style={{ width: '200px' }}
                  />
                ) : profile.department ?? 'Not available'}
              </p>

              {isCounselor && (
                <button
                  onClick={() => handleDelete(profile.username)}
                  style={{
                    marginTop: '0.5rem',
                    background: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Delete Profile
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}