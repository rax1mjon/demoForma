import axios from "axios";
import Cookies from "js-cookie";
import { ACCESSTOKEN, ENDPOINT, REFRESHTOKEN } from "../constants";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const requies = axios.create({
  baseURL: `${ENDPOINT}/api`,
  timeout: 10000,
});

// Requestga access qo‘shish
requies.interceptors.request.use((config) => {
  const token = Cookies.get(ACCESSTOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
requies.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 bo‘lsa
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return axios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refresh = Cookies.get(REFRESHTOKEN);
        const { data } = await axios.post(
          `${ENDPOINT}/api/auth/token/refresh/`,
          { refresh }
        );

        Cookies.set(ACCESSTOKEN, data.access);
        processQueue(null, data.access);

        originalRequest.headers.Authorization = "Bearer " + data.access;
        return axios(originalRequest);
      } catch (err) {
        processQueue(err, null);
        Cookies.remove(ACCESSTOKEN);
        Cookies.remove(REFRESHTOKEN);
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
