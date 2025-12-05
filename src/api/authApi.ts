import apiClient from "./apiClient";
import { LoginResponse, UserType } from "../types/AuthTypes";

interface ApiResponse<T> {
  status: boolean;
  message?: string;
  user?: T;
  token?: string;
}


export const registerUser = async (formData: {
  name: string;
  email: string;
  password: string;
  birthDate?: string;
  weight?: number;
  height?: number;
  profileImage?: string;
}) => {
  try {
    const response = await apiClient.post<ApiResponse<UserType>>(
      "/users/register",
      formData
    );

    return response.data;
  } catch (error: any) {
    throw extractError(error);
  }
};


export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>("/users/login", {
      email,
      password,
    });

    return response.data; 
  } catch (error: any) {
    throw extractError(error);
  }
};


export const forgotPassword = async (email: string) => {
  try {
    const response = await apiClient.post("/users/auth/forgot-password", { email });
    return response.data;
  } catch (error: any) {
    throw extractError(error);
  }
};

const extractError = (error: any) => {
  const msg =
    error?.message ||
    error?.response?.data?.message ||
    "Something went wrong. Please try again.";

  return { status: false, message: msg };
};
