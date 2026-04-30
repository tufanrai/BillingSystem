import { ILogin } from "@/components/pages/auth/Login";
import { axiosInstance } from "./axiosInstance";
import { INewPassword } from "@/components/pages/auth/ConfirmPassword";
import { IUserSchema } from "@/components/pages/dashboard/settings/Settings";
import { IFoodItem, ITable } from "@/components/pages/forms/NewItemForm";
import { ISignUp } from "@/components/pages/auth/SignUp";
import Cookies from "js-cookie";
import axios from "axios";
import { IOrderBill } from "@/components/pages/dashboard/cashier/new-orders/Orders";

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
export const SignUpUser = async ({ confirmPassword, ...data }: ISignUp) => {
  try {
    console.log(data);
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
  } catch (err: any) {
    return err.message;
  }
};

// Get user's data
export const GetUserData = async () => {
  try {
    const id = JSON.parse(Cookies.get("user")!)._id;
    const response = await axiosInstance.get(`/user/${id}`);
    return response.data;
  } catch (err: any) {
    return err.message;
  }
};

// update user
export const updateUserCredentails = async (data: IUserSchema) => {
  try {
    const id = JSON.parse(Cookies.get("user")!)._id;
    const response = await axiosInstance.put(`/user/${id}`, data);
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

// Reports
// GET: /report/restaurant_id
export const getAllReports = async () => {
  try {
    const id = JSON.parse(Cookies.get("user")!).restaurant;
    const response = await axiosInstance.get(`/bills/${id}`);

    return response;
  } catch (err: any) {
    return err.message;
  }
};

// Food items
// GET: /items/ (food)
export const getAllFoodItem = async () => {
  try {
    const response = await axiosInstance.get("/items/");
    return response.data;
  } catch (err: any) {
    return err;
  }
};

// POST: /items/ (food)
export const addFoodItem = async (data: IFoodItem) => {
  try {
    const response = await axiosInstance.post("/items", data);
    return response.data;
  } catch (err: any) {
    return err.message;
  }
};

// Table
// GET: /table/ (table)
export const getAllTable = async () => {
  try {
    const response = await axiosInstance.get("/table/");
    return response.data;
  } catch (err: any) {
    return err;
  }
};

// POST: /table/ (table)
export const addTable = async (data: ITable) => {
  try {
    const response = await axiosInstance.post("/table/", {
      tableNumber: Number(data.tableNumber),
      capacity: Number(data.capacity),
      location: data.location,
    });
    return response;
  } catch (err: any) {
    return err;
  }
};

// Bill
export const placeNewOrder = async (data: IOrderBill) => {
  try {
    const response = await axiosInstance.post("/orders", data);
    return response.data;
  } catch (err: any) {
    return err.message;
  }
};
