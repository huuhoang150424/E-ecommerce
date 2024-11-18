import axios from "axios";

interface UploadResponse {
  error?: string;
  imageUrl?: string | undefined;
}

export const handleUpload = async (image: any): Promise<UploadResponse> => {
  let result: UploadResponse;
  try {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "e-commare")
    formData.append("cloud_name", "doklsozku"); 
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/doklsozku/image/upload",
      formData
    );
    result = {
      imageUrl: response.data.secure_url,
    };
  } catch (error) {
    console.error("Lỗi tải lên:", error);
    result = {
      error: "Lỗi tải lên Cloudinary",
    };
  }
  return result;
};
