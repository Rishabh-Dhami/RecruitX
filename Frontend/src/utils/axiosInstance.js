import axios from "axios";
import { store } from "../store/store";
import { login, logout } from "../store/authSlice";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers = [];

const onTokenRefreshed = (newAccessToken) => {
  refreshSubscribers.forEach((callback) => callback(newAccessToken));
  refreshSubscribers = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/user/refresh-accesstoken`,
          {
            withCredentials: true,
          },
        );

        const newAccessToken = refreshResponse.data.info.accessToken;
        store.dispatch(
          login({
            userData: refreshResponse.data.info.user,
            accessToken: newAccessToken,
          }),
        );

        axiosInstance.defaults.headers["Authorization"] =
          `Bearer ${newAccessToken}`;
        onTokenRefreshed(newAccessToken);

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
