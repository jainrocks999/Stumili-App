import apiClient from "./apiClient";

export const getAPI = async <T = any>(
  endpoint: string,
  params: any = {}
): Promise<T> => {
  try {
    const response = await apiClient.get(endpoint, { params });
    return response.data;
  } catch (error: any) {
    // custom unified error message
    const msg =
      error?.response?.data?.message ||
      error.message ||
      "Something went wrong";

    throw { status: false, message: msg };
  }
};
export const postAPI = async <T = any>(
  endpoint: string,
  body: any = {},
  params: any = {}
): Promise<T> => {
  try {
    const response = await apiClient.post(endpoint, body, { params });
    return response.data;
  } catch (error: any) {
    const msg =
      error?.response?.data?.message ||
      error.message ||
      "Something went wrong";

    throw { status: false, message: msg };
  }
};

