import axios from "axios";

const api = axios.create({
  baseURL: "https://jiranew.cybersoft.edu.vn/api/",
});

const userInfo = localStorage.getItem("USER_LOGIN");
api.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      TokenCybersoft:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxNCIsIkhldEhhblN0cmluZyI6IjE1LzA0LzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY0OTk4MDgwMDAwMCIsIm5iZiI6MTYyMTE4NDQwMCwiZXhwIjoxNjUwMTI4NDAwfQ.43sCqLD_V6VUJP8qZLQSWO07uCIDI7bS5MGR92deYb8",
      Authorization: localStorage.getItem("USER_LOGIN")
        ? "Bearer " + JSON.parse(userInfo).content.accessToken
        : "",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;
