import React, { useState } from 'react';
import EditableField from './EditableField';
import { collegeDepartmentData } from '../pages/RegisterPage';

const ProfileCard = ({ profile, currentUser, isCounselor, onUpdate, onDelete }) => {
  const isSelf = currentUser.username === profile.username;
  const [isEditing, setIsEditing] = useState(false);

  const [localData, setLocalData] = useState({
    cumulative_gpa: profile.cumulative_gpa ?? '',
    department: profile.department ?? '',
    college: profile.college ?? '',
    first_name: profile.first_name ?? '',
    last_name: profile.last_name ?? '',
    id: profile.id,
  });

  const canEdit = isCounselor || isSelf;
  const departmentList = collegeDepartmentData[localData.college] || [];

  const handleSave = () => {
    const updatedFields = {};

    Object.entries(localData).forEach(([field, value]) => {
      if (value !== profile[field]) {
        updatedFields[field] = value;
      }
    });

    if (Object.keys(updatedFields).length > 0) {
      onUpdate(profile.id, updatedFields);
    }

    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalData({
      cumulative_gpa: profile.cumulative_gpa ?? '',
      department: profile.department ?? '',
      college: profile.college ?? '',
      first_name: profile.first_name ?? '',
      last_name: profile.last_name ?? '',
      id: profile.id,
    });
    setIsEditing(false);
  };

  return (
    <div
      style={{
        background: '#1a1a2e',
        padding: '1rem',
        marginBottom: '1rem',
        borderRadius: '8px',
        color: 'white',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.5rem',
      }}>
        {isEditing && profile.role.toLowerCase() === 'student' && canEdit ? (
          <div style={{ flex: 1 }}>
            <EditableField
              label="First Name"
              value={localData.first_name}
              type="text"
              disabled={!canEdit}
              onChange={(val) =>
                setLocalData(prev => ({ ...prev, first_name: val }))
              }
            />
            <EditableField
              label="Last Name"
              value={localData.last_name}
              type="text"
              disabled={!canEdit}
              onChange={(val) =>
                setLocalData(prev => ({ ...prev, last_name: val }))
              }
            />
          </div>
        ) : (
          <h2 style={{ margin: 0 }}>
            {profile.first_name} {profile.last_name}
          </h2>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.9rem', color: '#ccc' }}>@{profile.username}</span>
          {profile.role.toLowerCase() === 'counselor' && (
            <span style={{
              backgroundColor: '#fff',
              color: '#ff6600',
              fontWeight: 'bold',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
            }}>
              Counselor
            </span>
          )}
        </div>
      </div>

      <p><strong>Role:</strong> {profile.role}</p>
      <p><strong>Email:</strong> {profile.email}</p>

      {/* Editable Fields for Students */}
      {profile.role.toLowerCase() === 'student' && (
        <>
          <EditableField
            label="GPA"
            value={localData.cumulative_gpa}
            type="number"
            disabled={!isEditing || !canEdit}
            onChange={(val) =>
              setLocalData(prev => ({ ...prev, cumulative_gpa: val }))
            }
          />
          <EditableField
            label="Department"
            value={localData.department}
            type="text"
            disabled={!isEditing || !canEdit}
            onChange={(val) =>
              setLocalData(prev => ({ ...prev, department: val }))
            }
            options={departmentList}
          />
        </>
      )}

      <p><strong>College:</strong> {profile.college}</p>

      {/* Controls */}
      {canEdit && (
        <div style={{ marginTop: '1rem' }}>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              style={{
                background: '#3498db',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '0.5rem',
              }}
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                style={{
                  background: '#2ecc71',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginRight: '0.5rem',
                }}
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                style={{
                  background: '#7f8c8d',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </>
          )}
          <button
            onClick={() => onDelete(profile.username)}
            style={{
              marginTop: '0.5rem',
              background: '#e74c3c',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Delete Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;