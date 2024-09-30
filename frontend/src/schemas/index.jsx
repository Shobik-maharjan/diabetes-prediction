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
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  re_password: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const predictSchema = Yup.object({
  Pregnancies: Yup.number()
    .required("Pregnancies is required")
    .min(0, "Please enter details"),
  Glucose: Yup.number()
    .required("Glucose level is required")
    .min(70, "Glucose must be at least 70")
    .max(400),
  BloodPressure: Yup.number()
    .required("Blood Pressure is required")
    .min(60, "Blood Pressure must be at least 60")
    .max(120, "Blood Pressure must be at least 120"),
  SkinThickness: Yup.number()
    .required("Skin Thickness is required")
    .min(0, "Skin Thickness must be at least 0")
    .max(99, "Skin Thickness must be below 99"),
  Insulin: Yup.number()
    .required("Insulin is required")
    .min(0, "Insulin must be at least 0")
    .max(846),
  BMI: Yup.number()
    .required("BMI is required")
    .min(15, "BMI must be at least 15")
    .max(60, "BMI must be below 60"),
  DiabetesPedigreeFunction: Yup.number()
    .required("Diabetes Pedigree Function is required")
    .min(0, "Diabetes Pedigree Function must be at least 0")
    .max(2.5, "Diabetes Pedigree Function must be below 2.5"),
  Age: Yup.number()
    .required("Age is required")
    .min(16, "Age must be at least 16")
    .max(100, "Age must be below 100"),
});
