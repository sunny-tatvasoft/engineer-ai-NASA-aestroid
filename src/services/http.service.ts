import axios from "axios";
import { ASTEROID_API_BASE_URL } from "../utils/constants";

const axiosInstance = axios.create({
  baseURL: ASTEROID_API_BASE_URL,
});

const http = {
  get: axiosInstance.get,
  post: axiosInstance.post,
};

export default http;
