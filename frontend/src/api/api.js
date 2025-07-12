import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register/`, formData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("registerUser response:", response); //  Logs full Axios response
    return response.data;
  } catch (error) {
    console.error("API error inside registerUser:", error); //
    throw error; // Re-throws the full error object so you catch it in handleSubmit
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login/`, formData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Unknown error occurred' };
  }
};