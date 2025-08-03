import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProfileCard from '../components/ProfileCard';
import getCookie from '../utils/getCookie';
import { collegeDepartmentData } from './RegisterPage';

const secureAxios = axios.create({
  baseURL: 'http://localhost:8000/',
  withCredentials: true,
});

export default function UserPage() {
  const navigate = useNavigate();
  const storedUsername = localStorage.getItem('username');
  const [currentUser, setCurrentUser] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [collegeFilter, setCollegeFilter] = useState('');
  const [availableColleges, setAvailableColleges] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [hoveredUsername, setHoveredUsername] = useState(null);

  useEffect(() => {
    secureAxios.get('/csrf-check/')
      .then(res => console.log('✅ CSRF check passed:', res.data))
      .catch(err => console.error('❌ CSRF check failed:', err));
  }, []);

  useEffect(() => {
    if (!storedUsername) {
      setLoading(false);
      return;
    }

    secureAxios.get('users/user-profiles/')
      .then(res => {
        const allProfiles = Array.isArray(res.data) ? res.data : [];
        setProfiles(allProfiles);
        const me = allProfiles.find(p => p.username === storedUsername);
        setCurrentUser(me);
        const colleges = Object.keys(collegeDepartmentData);
        setAvailableColleges(colleges);
        setCollegeFilter(me?.college || colleges[0] || '');
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load user data.');
        setLoading(false);
      });
  }, []);

  const isCounselor = currentUser?.role.toLowerCase() === 'counselor';

  const visibleProfiles = profiles.filter(p => {
    const sameCollege = p.college === collegeFilter;
    const isRelevantRole = ['student', 'counselor'].includes(p.role.toLowerCase());

    if (isCounselor) {
      return sameCollege && isRelevantRole;
    } else {
      return p.username === currentUser?.username;
    }
  });

  const sortedProfiles = [...visibleProfiles].sort((a, b) => a.username.localeCompare(b.username));

  const onUpdate = (profileId, updatedFields) => {
    const previousState = [...profiles];
    setProfiles(prev =>
      prev.map(p => p.id === profileId ? { ...p, ...updatedFields } : p)
    );

    secureAxios.patch(`users/user-profiles/${profileId}/`, updatedFields, {
      headers: {
        'X-CSRFToken': getCookie('csrftoken'),
      },
      withCredentials: true
    })
      .then(response => {
        console.log("✅ Patch success:", response.data);
        setSuccessMessage('✅ Profile updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      })
      .catch(error => {
        console.error("❌ Patch failed:", error);
        console.log("DEBUG CSRF token:", getCookie('csrftoken'));
        setError('Failed to update profile.');
        setProfiles(previousState);
      });
  };

  const handleDelete = (username) => {
    if (!window.confirm(`Are you sure you want to delete ${username}?`)) return;

    const isSelfDelete = username === currentUser?.username;
    const endpoint = isSelfDelete
      ? 'users/delete-own-profile/'
      : `users/delete/${username}/`;

    secureAxios.delete(endpoint, {
      headers: {
        'X-CSRFToken': getCookie('csrftoken'),
      },
      withCredentials: true,
    })
      .then((response) => {
        setProfiles(prev => prev.filter(p => p.username !== username));
        setSuccessMessage('✅ Profile deleted successfully!');

        if (isSelfDelete && response.data.redirect) {
          setTimeout(() => {
            navigate(response.data.redirect);
          }, 1500);
        } else {
          setTimeout(() => setSuccessMessage(''), 3000);
        }
      })
      .catch(() => {
        setError('Failed to delete profile.');
      });
  };

  const goToDashboard = () => {
    if (currentUser?.role.toLowerCase() === 'admin' || currentUser?.role.toLowerCase() === 'counselor') {
      navigate('/admin-dashboard');
    } else {
      navigate('/student-dashboard');
    }
  };

  return (
    <div style={{ padding: '2rem', background: 'white' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <h1 style={{ color: '#FA4616', margin: 0 }}>
          {isCounselor ? 'Student Management' : 'Your Profile'}
        </h1>
        <button
          onClick={goToDashboard}
          style={{
            backgroundColor: '#FA4616',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#d83c12'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#FA4616'}
        >
          Go Back to Dashboard
        </button>
      </div>

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
      {successMessage && (
        <p style={{ color: 'green', fontWeight: 'bold', marginBottom: '1rem' }}>
          {successMessage}
        </p>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : sortedProfiles.length === 0 ? (
        <p>No profiles to display.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {sortedProfiles.map(profile => (
            <li key={profile.username} style={{ marginBottom: '1rem', background: 'transparent', position: 'relative' }}>
              <div
                className="profile-card-wrapper"
                onMouseEnter={() => setHoveredUsername(profile.username)}
                onMouseLeave={() => setHoveredUsername(null)}
                style={{
                  borderRadius: '0.5rem',
                  background: profile.role.toLowerCase() === 'counselor'
                    ? 'rgba(255, 102, 0, 0.9)'
                    : hoveredUsername === profile.username
                      ? 'rgba(255, 255, 255, 0.8)'
                      : 'transparent',
                  color: profile.role.toLowerCase() === 'counselor' ? '#fff' : '#000',
                  boxShadow: hoveredUsername === profile.username
                    ? '0px 6px 16px rgba(0, 0, 0, 0.2)'
                    : '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  transform: hoveredUsername === profile.username ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <ProfileCard
                  profile={profile}
                  currentUser={currentUser}
                  isCounselor={isCounselor}
                  onUpdate={onUpdate}
                  onDelete={handleDelete}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}