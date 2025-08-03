import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


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
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      },
      withCredentials: true  // This tells Axios to accept cookies!
    });
    return response.data;
  } catch (error) {
    console.error("API error inside loginUser:", error);
    throw error.response?.data || { error: 'Unknown error occurred' };
  }
};