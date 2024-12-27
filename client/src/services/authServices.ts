import { AxiosError } from "axios";
import axiosInstance from "../lib/axios";

interface User {
  name: string;
  username: string;
  email: string;
  password: string;
}

export const check = async () => {
  try {
    const response = await axiosInstance.get("/auth/check");

    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.message;
      const errorStatus = error.code;

      return { message: errorMessage, status: errorStatus };
    } else {
      console.log("Erro de rede:", (error as Error).message);
      return { message: "Erro de rede", status: 500 };
    }
  }
};

export const login = async (credentials: {
  username: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      status: response.status,
      token: response.data.token,
      user: response.data.user,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data.message;
      const errorStatus = error.response?.status;

      return { message: errorMessage, status: errorStatus };
    } else {
      console.log("Erro de rede:", (error as Error).message);
      return { message: "Erro de rede", status: 500 };
    }
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");

    return {
      message: response.data.message,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data.message;
      const errorStatus = error.response?.status;

      return { message: errorMessage, status: errorStatus };
    } else {
      console.log("Erro de rede:", (error as Error).message);
      return { message: "Erro de rede", status: 500 };
    }
  }
};

export const register = async (user: User) => {
  try {
    const response = await axiosInstance.post("/users", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      status: response.status,
      message: response.data.message,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data.message;
      const errorStatus = error.response?.status;

      return { message: errorMessage, status: errorStatus };
    } else {
      console.log("Erro de rede:", (error as Error).message);
      return { message: "Erro de rede", status: 500 };
    }
  }
};
