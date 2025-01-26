import axiosInstance from "@src/lib/axios";

interface FormProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendMessage = async (form: FormProps) => {
  try {
    const response = await axiosInstance.post("/contact", form, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw new Error("Failed to fetch article");
  }
};
