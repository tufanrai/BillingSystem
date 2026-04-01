import * as yup from "yup";

/*
    Auth form schema to validate the proper input of the credentials
*/
// login form schema
export const loginSchema = yup.object({
  email: yup
    .string()
    .required("please enter your email")
    .email("please enter a valid email"),
  password: yup.string().required("please enter your password"),
});

// Sign up form schema
export const signUpSchema = yup.object({
  fullName: yup.string().required("please enter your full name"),
  email: yup
    .string()
    .required("please enter your email")
    .email("please enter a valid email"),
  restaurant: yup.string().required("please enter the name of your restaurant"),
  password: yup
    .string()
    .required("please enter a password")
    .min(6, "your password must contain at least 6 characters")
    .matches(/\d/, "your password must contain at least on digit")
    .matches(
      /[!@#]/,
      "your password must have at least one of (!@#) these special character",
    ),
  confirmPassword: yup
    .string()
    .required("please re-enter your password")
    .oneOf([yup.ref("password")], "your password did not match"),
});

// Table form schema
export const tableSchema = yup.object({
  tableNumber: yup.number().required("please enter the table number"),
  capacity: yup.number().required("please enter the capacity of the table"),
  location: yup.string().required("please enter the location of the table"),
});

// Menu form schema
export const menuItemSchema = yup.object({
  name: yup.string().required("please enter the name of the food item"),
  description: yup.string(),
  price: yup.number().required("please enter the price of the food item"),
  category: yup.string().required("please enter the category of the food"),
});
