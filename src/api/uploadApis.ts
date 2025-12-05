import apiClient from "./apiClient";

export const scanFood = async (
  image: { uri: string; name: string; type: string,size:number },
  userInput: string,
  onProgress?: (percent: number) => void
) => {
  try {
    const formData = new FormData();

    // File size validation (5MB limit)
    if (image.size && image.size > 10 * 1024 * 1024) {
      throw new Error("Image size must be under 10 MB");
    }

    formData.append("foodImage", {
      uri: image.uri,
      type: image.type,
      name: image.name,
    } as any);

    formData.append("userInput", userInput);

    const response = await apiClient.post("/users/scan-food", formData, {
      onUploadProgress: (event) => {
        const percent = Math.round((event.loaded / (event?.total??0)) * 100);
        onProgress?.(percent);
      },
    });

    return response.data;
  } catch (error: any) {
    throw {
      status: false,
      message: error?.message || "Upload failed",
    };
  }
};
