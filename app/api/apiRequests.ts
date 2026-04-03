import { ILogin } from "@/components/pages/auth/Login";
import { axiosInstance } from "./axiosInstance";
import { ISignUp } from "@/components/pages/auth/SignUp";
import { INewPassword } from "@/components/pages/auth/ConfirmPassword";
import { IUserSchema } from "@/components/pages/dashboard/settings/Settings";

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

// update user
export const updateUserCredentails = async (data: IUserSchema) => {
  try {
    const response = await axiosInstance.put("/auth/profile", data);
    return response.data;
  } catch (err: any) {
    return err.message;
  }
};

// update password
export const updatePassword = async (data: INewPassword) => {
  try {
    const response = await axiosInstance.put("/auth/update-password", data);
    return response.data;
  } catch (err: any) {
    return err.message;
  }
};
