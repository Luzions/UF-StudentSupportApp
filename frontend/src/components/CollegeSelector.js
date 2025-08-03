// CollegeSelector.js
import React from 'react';

const CollegeSelector = ({ colleges, selectedCollege, onSelect }) => (
  <div>
    <label htmlFor="college">College:</label>
    <select
      id="college"
      value={selectedCollege}
      onChange={(e) => onSelect(e.target.value)}
    >
      {colleges.map((college) => (
        <option key={college} value={college}>
          {college}
        </option>
      ))}
    </select>
  </div>
);

export default CollegeSelector;