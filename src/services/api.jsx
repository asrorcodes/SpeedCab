import axios from "axios";
import { getItem } from "@/helpers/persistanse-storage";

axios.defaults.baseURL = "http://161.97.116.87:4001";

axios.interceptors.request.use((config) => {
  const token = getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("Access token topilmadi.");
  }
  return config;
});


export default axios;