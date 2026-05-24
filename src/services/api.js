import axios from 'axios';

// Get backend URL from environment variable (Cloud Run provides this)
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '/api';

export const analyzeImage = async (file) => {
  const formData = new FormData();
  formData.append('screenshot', file);

  // Use full backend URL when deployed, fallback to relative path for local dev
  const apiUrl = BACKEND_URL.endsWith('/api') 
    ? BACKEND_URL + '/analyze' 
    : BACKEND_URL + '/api/analyze';

  const response = await axios.post(apiUrl, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  
  return response.data;
};
