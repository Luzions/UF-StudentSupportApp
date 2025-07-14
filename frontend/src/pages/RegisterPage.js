// src/pages/RegisterPage.jsx
import { registerUser } from "../api/api";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ufLogo from "../assets/uf-logo.png";
import { useNavigate } from "react-router-dom";

const collegeDepartmentData = {
  "College of Agricultural and Life Sciences": [
    "Agricultural and Biological Engineering",
    "Agricultural Education and Communication",
    "Agronomy",
    "Animal Sciences",
    "CALS Interdisciplinary Program",
    "Entomology and Nematology",
    "Family, Youth and Community Sciences",
    "Food and Resource Economics",
    "Food Science and Human Nutrition",
    "Horticultural Sciences",
    "Microbiology and Cell Science",
    "Plant Molecular and Cellular Biology",
    "Plant Pathology",
    "School of Forest, Fisheries, and Geomatics Sciences",
    "School of Natural Resources and Environment",
    "Soil, Water, and Ecosystem Sciences",
    "Wildlife Ecology and Conservation",
  ],
  "College of the Arts": [
    "College of the Arts Interdisciplinary Program",
    "Digital Worlds Institute",
    "School of Art and Art History",
    "School of Music",
    "School of Theatre and Dance",
  ],
  "Warrington College of Business": [
    "College of Business Interdisciplinary Programs in Business Administration",
    "Finance, Insurance, and Real Estate",
    "Fisher School of Accounting",
    "Information Systems and Operations Management",
    "Management",
    "Marketing",
  ],
  "College of Dentistry": ["Dental Sciences"],
  "College of Design, Construction and Planning": [
    "DCP Interdisciplinary Programs",
    "Interior Design",
    "Landscape Architecture",
    "M. E. Rinker, Sr. School of Construction Management",
    "School of Architecture",
    "Urban and Regional Planning",
  ],
  "College of Education": [
    "Human Development and Organizational Studies in Education",
    "School of Teaching and Learning",
    "Special Education, School Psychology and Early Childhood Studies",
  ],
  "Herbert Wertheim College of Engineering": [
    "Agricultural and Biological Engineering",
    "Chemical Engineering",
    "Civil and Coastal Engineering",
    "Computer and Information Science and Engineering",
    "Electrical and Computer Engineering",
    "Engineering Education",
    "Environmental Engineering Sciences",
    "Industrial and Systems Engineering",
    "J. Crayton Pruitt Family Department of Biomedical Engineering",
    "Materials Science and Engineering",
    "Mechanical and Aerospace Engineering",
    "Nuclear and Radiological Engineering",
  ],
  "College of Health and Human Performance": [
    "Applied Physiology and Kinesiology",
    "Health Education and Behavior",
    "Health and Human Performance",
    "Sport Management",
    "Tourism, Hospitality and Event Management",
  ],
  "College of Journalism and Communications": ["Mass Communication"],
  "College of Liberal Arts and Sciences": [
    "Anthropology",
    "Astronomy",
    "Biology",
    "Center for Latin American Studies",
    "Chemistry",
    "Classics",
    "Computer and Information Science and Engineering",
    "Languages, Literatures and Cultures",
    "Economics",
    "English",
    "Gender, Sexuality, and Women's Studies",
    "Geography",
    "Geological Sciences",
    "History",
    "Interdisciplinary Department",
    "Linguistics",
    "Mathematics",
    "Philosophy",
    "Physics",
    "Plant Molecular and Cellular Biology",
    "Political Science",
    "Psychology",
    "Religion",
    "Sociology and Criminology & Law",
    "Spanish and Portuguese Studies",
    "Statistics",
  ],
  "College of Medicine": [
    "Biochemistry and Molecular Biology",
    "Biostatistics",
    "Epidemiology",
    "Health Outcomes and Biomedical Informatics",
    "Molecular Genetics and Microbiology",
    "College of Medicine Interdisciplinary Programs",
  ],
  "College of Nursing": ["Nursing Sciences"],
  "College of Pharmacy": [
    "Medicinal Chemistry",
    "Pharmaceutical Outcomes and Policy",
    "Pharmaceutics",
    "Pharmacodynamics",
    "Pharmacotherapy and Translational Research",
  ],
  "College of Public Health and Health Professions": [
    "Biostatistics",
    "Clinical and Health Psychology",
    "Environmental and Global Health",
    "Epidemiology",
    "Health Services Research, Management and Policy",
    "Speech, Language, and Hearing Sciences",
  ],
  "College of Veterinary Medicine": ["Veterinary Medical Sciences"],
};

// Common input/select styles
const inputStyle = {
  width: "100%",
  marginBottom: "1rem",
  padding: "1rem",
  fontSize: "1rem",
  border: "1px solid #ddd",
  borderRadius: "5px",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

export default function RegisterPage() {
  const [selectedCollege, setSelectedCollege] = useState("");
  const [departments, setDepartments] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    college: "",
    department: "",
    role: "",
    password: "",
    confirmPassword: "",
  });



  const handleCollegeChange = (e) => {
    const college = e.target.value;
    setSelectedCollege(college);
    setDepartments(collegeDepartmentData[college] || []);
    setFormData({ ...formData, college });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit handler triggered!");
    alert("Submitting form...");

    if (!formData.username || !formData.password || !formData.email) {
      alert("Please fill in all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const payload = {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        role: formData.role,
        college: formData.college,
        department: formData.department,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
      };

      console.log("Payload:", payload); // Debugging line to check payload
      const response = await registerUser(payload);
      console.log("Success:", response);
      alert("Account created successfully!"); // Visual feedback

      if (response.message === "User and profile created successfully.") {
      // Optional: Show success message for a second
        setShowSuccess(true);
        setTimeout(() => {
        navigate("/login");
        }, 1500); //
      }

      // Optionally redirect or show confirmation
    } catch (error) {
      console.error("Error:", error);
      alert("Submission failed! Check console for error."); // UI fallback
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(to right, #FF6A00, #0021A5)",
        padding: "2rem",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          padding: "2rem",
          backgroundColor: "lightgray",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          boxSizing: "border-box",
        }}
      >
        <img
          src={ufLogo}
          alt="UF Logo"
          style={{
            width: "80px",
            display: "block",
            margin: "0 auto 1rem auto",
          }}
        />
        <h2
          style={{
            textAlign: "center",
            color: "#0021A5",
            marginBottom: "0.5rem",
          }}
        >
          UF-SWSC Registration
        </h2>
        <p
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            color: "#666",
          }}
        >
          Create your account
        </p>

        {/* ✅ Success Message */}
        {showSuccess && (
            <div style={{
                backgroundColor: "#d4edda",
                padding: "1rem",
                margin: "0 auto 2rem auto",   // This gives top/bottom space + horizontal centering

                borderRadius: "5px",
                color: "#155724"
             }}>
          ✅ Account created successfully! Redirecting to login...
            </div>
        )}


        {/* ✅ Main Form */}
        <form onSubmit={handleSubmit}>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            style={inputStyle}
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            style={inputStyle}
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            style={inputStyle}
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number (Optional)"
            style={inputStyle}
          />
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            style={inputStyle}
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="counselor">Counselor</option>

          </select>


          <select value={formData.college} onChange={handleCollegeChange} style={inputStyle}>
            <option value="">Select College</option>
            {Object.keys(collegeDepartmentData).map((college) => (
              <option key={college} value={college}>
                {college}
              </option>
            ))}
          </select>

          {formData.role === "student" && (
            <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            style={inputStyle}
            >
            <option value="">Select Department</option>
            {departments.map((dept) => (
            <option key={dept} value={dept}>
                {dept}
            </option>
            ))}
            </select>
          )}


          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            style={inputStyle}
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            style={inputStyle}
          />

          <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
            <input type="checkbox" id="tos" required />
            <label htmlFor="tos" style={{ marginLeft: "0.5rem", color: "#666" }}>
              I agree to the <Link to="#">Terms of Service</Link> and{" "}
              <Link to="#">Privacy Policy</Link>
            </label>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "1rem",
              background: "linear-gradient(to right, #36D1DC, #5B86E5)",
              color: "white",
              fontSize: "1rem",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#001a85")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#0021A5")}
          >
            Create Account
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "1rem",
            color: "#666",
          }}
        >
          Already have an account? <Link to="/login">Sign in here</Link>
        </p>
      </div>
    </div>
  );
}