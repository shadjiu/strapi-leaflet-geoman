import axios, { AxiosInstance } from "axios";
import pluginId from "../pluginId";
import { auth } from "@strapi/helper-plugin";

const instance: AxiosInstance = axios.create({
  baseURL: `${process.env.STRAPI_ADMIN_BACKEND_URL}/${pluginId}`,
  headers: {
    Authorization: `Bearer ${auth.getToken()}`,
    "Content-Type": "application/json",
  },
});

export default instance;
