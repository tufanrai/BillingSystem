import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token") ?? "";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5002/api",
  headers: {
    Authorization: `Bearer ${token}`,
    "content-Type": "application/x-www-form-urlencoded",
  },
});
