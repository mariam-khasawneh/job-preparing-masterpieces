import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../Store/Slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import FormInput from "../Components/FormInput";
import Button from "../Components/Button/Button";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { AiOutlineEyeInvisible, AiFillEye } from "react-icons/ai";
import { Section } from "../Components/styles-components/containers";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { loginUser } from "../Store/Thunks/authThunks";

function Login() {
  return (
    <Section className="justify-center min-h-screen">
      <div className="w-full md:w-1/2 lg:w-1/3 ">
        <LoginForm />
      </div>
    </Section>
  );
}

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      user_name_or_email: "",
      password: "",
    },
    validationSchema: Yup.object({
      user_name_or_email: Yup.string().required(
        "Username or email is required"
      ),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const loginData = {
          user_name: values.user_name_or_email.includes("@")
            ? undefined
            : values.user_name_or_email,
          email: values.user_name_or_email.includes("@")
            ? values.user_name_or_email
            : undefined,
          password: values.password,
        };

        const resultAction = await dispatch(loginUser(loginData));

        if (loginUser.fulfilled.match(resultAction)) {
          // Login was successful
          toast.success("Login successful!");
          setTimeout(() => {
            navigate("/home");
          }, 1500);
        } else if (loginUser.rejected.match(resultAction)) {
          // Login failed
          const error = resultAction.payload;
          let errorMessage = "An error occurred. Please try again.";

          if (error && error.message) {
            errorMessage = error.message;
          }

          toast.error(errorMessage);
        }
      } catch (error) {
        toast.error("An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="w-full">
        <div className="text-2xl font-bold text-primaryIndigo text-center py-4">
          Log In
        </div>
        <div className="flex flex-col gap-6">
          <FormInput
            label="Username or Email"
            placeholder="Username or Email"
            type="text"
            name="user_name_or_email"
            value={formik.values.user_name_or_email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.user_name_or_email &&
              formik.errors.user_name_or_email
            }
            leftIcon={<FaUserAlt className="text-slate-400" size={14} />}
          />
          <FormInput
            label="Password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
            leftIcon={<FaLock className="text-slate-400" size={14} />}
            rightIcon={
              showPassword ? (
                <AiOutlineEyeInvisible
                  className="text-slate-400 cursor-pointer"
                  onClick={handleTogglePassword}
                  size={20}
                />
              ) : (
                <AiFillEye
                  className="text-slate-400 cursor-pointer"
                  onClick={handleTogglePassword}
                  size={20}
                />
              )
            }
          />
          <Button extraSmall primary type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log In"}
          </Button>
          <div className="flex justify-center">
            <span className="text-sm font-medium text-gray-700">
              Forgot Password?
              <Link
                className="text-primaryIndigo pl-1 font-semibold"
                to="/recovery"
              >
                Recover Now
              </Link>
            </span>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
