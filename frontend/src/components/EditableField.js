import React from 'react';
import { collegeDepartmentData } from '../pages/RegisterPage';


const EditableField = ({
  label,
  value,
  type = 'text',
  disabled,
  onChange,
  options = null // ← optional for dropdowns
}) => {
  const renderInput = () => {
    if (options) {
      return (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: '220px' }}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(type === 'number' ? parseFloat(e.target.value) : e.target.value)
        }
        style={{ width: type === 'number' ? '80px' : '200px' }}
      />
    );
  };

  return (
    <p style={{ marginBottom: '0.5rem' }}>
      <strong>{label}:</strong>{' '}
      {disabled ? (value ?? 'Not available') : renderInput()}
    </p>
  );
};

export default EditableField;