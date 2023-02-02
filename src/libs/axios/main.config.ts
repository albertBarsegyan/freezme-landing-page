import axios from "axios";

export const interceptorsResponseErrorHandler = async (error: any) => {
  if (error.response) {
    if (error.response.status === 404) {
      return Promise.reject(null);
    }
  }

  return Promise.reject(null);
};

const axiosConfigured = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

axiosConfigured.interceptors.response.use((response) => response, interceptorsResponseErrorHandler);

export default axiosConfigured;
