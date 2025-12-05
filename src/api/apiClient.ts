import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../storage/storageKeys";
import { MAIN_URl } from "@utils/constants";

const apiClient = axios.create({
  baseURL: `${MAIN_URl}/api`,

});

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    if (config.data instanceof FormData) {
      config.headers.set("Accept", "application/json");

      // ❗ DON'T set Content-Type, Axios will set boundary
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<any>) => {
    const status = error?.response?.status;

    if (status === 401) {
      await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      console.log("⚠ Token expired → auto logout");
    }

    return Promise.reject(
      error?.response?.data || { message: "Network Error" }
    );
  }
);

export default apiClient;
