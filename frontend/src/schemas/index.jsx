import * as Yup from "Yup";

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(8).required("Please enter your password"),
});

export const registerSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  re_password: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});
