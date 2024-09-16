import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import FormInput from "../Components/FormInput";
import Button from "../Components/Button/Button";
import { Section } from "../Components/styles-components/containers";

function ResetPassword() {
  return (
    <Section>
      <ResetPasswordForm />
    </Section>
  );
}

function ResetPasswordForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const user_name_or_email = location.state?.user_name_or_email;

  const formik = useFormik({
    initialValues: {
      otp: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string().required("OTP is required"),
      new_password: Yup.string().required("New password is required"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("new_password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/reset-password",
          {
            user_name_or_email,
            otp: values.otp,
            new_password: values.new_password,
          }
        );

        if (response.data.message === "Password reset successfully") {
          toast.success("Password reset successfully!");
          navigate("/login");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>Reset Password</h2>
      <FormInput
        type="text"
        name="otp"
        placeholder="Enter OTP"
        value={formik.values.otp}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.otp && formik.errors.otp}
      />
      <FormInput
        type="password"
        name="new_password"
        placeholder="New Password"
        value={formik.values.new_password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.new_password && formik.errors.new_password}
      />
      <FormInput
        type="password"
        name="confirm_password"
        placeholder="Confirm New Password"
        value={formik.values.confirm_password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.confirm_password && formik.errors.confirm_password
        }
      />
      <Button type="submit">Reset Password</Button>
    </form>
  );
}

export default ResetPassword;
