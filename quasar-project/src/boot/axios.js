import axios from 'axios';

// Set base URL for all axios requests
axios.defaults.baseURL = 'http://localhost:3001/api';

// Export as a boot file
export default ({ app }) => {
  app.config.globalProperties.$axios = axios;
};