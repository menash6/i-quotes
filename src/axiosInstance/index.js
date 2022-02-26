import axios from "axios";

import { baseUrl } from "./constants";

export function getJWTHeader(user) {
  return { Authorization: `Bearer ${user.token}` };
}

const config = { baseURL: baseUrl };
export const axiosInstance = axios.create(config);
