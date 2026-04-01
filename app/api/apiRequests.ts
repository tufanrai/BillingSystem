import { ILogin } from "@/components/pages/auth/Login";
import { axiosInstance } from "./axiosInstance";
import { ISignUp } from "@/components/pages/auth/SignUp";

// Login request
export const LogUser = async (data: ILogin) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  } catch (err: any) {
    return err.message;
  }
};

// Register request
export const SignUpUser = async (data: ISignUp) => {
  try {
    const response = await axiosInstance.post("/auth/signup", data);
    return response.data;
  } catch (err: any) {
    return err.message;
  }
};
