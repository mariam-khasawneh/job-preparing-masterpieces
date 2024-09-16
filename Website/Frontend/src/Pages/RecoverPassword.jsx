// export default RecoverPassword;
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import FormInput from "../Components/FormInput";
import Button from "../Components/Button/Button";
import { FaUserAlt } from "react-icons/fa";
import { Section } from "../Components/styles-components/containers";
import { toast } from "react-hot-toast";

function RecoverPassword() {
  return (
    <Section className="justify-center min-h-screen">
      <div className="w-full md:w-1/2 lg:w-1/3 ">
        <RecoverForm />
      </div>
    </Section>
  );
}

function RecoverForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      user_name_or_email: "",
    },
    validationSchema: Yup.object({
      user_name_or_email: Yup.string().required(
        "Username or email is required"
      ),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/recover-password",
          {
            user_name: values.user_name_or_email.includes("@")
              ? undefined
              : values.user_name_or_email,
            email: values.user_name_or_email.includes("@")
              ? values.user_name_or_email
              : undefined,
          },
          { withCredentials: true }
        );

        if (response.data.success) {
          console.log("Recovery email sent", response.data);

          // Show success toast
          toast.success("Recovery email sent successfully!");

          setTimeout(() => {
            navigate("/reset-password", {
              state: { email: values.user_name_or_email },
            });
          }, 1500);
        }
      } catch (error) {
        let errorMessage = "An error occurred. Please try again.";

        // Check for specific error responses
        if (error.response) {
          const status = error.response.status;
          const serverMessage = error.response.data.message;

          if (status === 404) {
            errorMessage = "User not found";
          } else if (serverMessage) {
            errorMessage = serverMessage;
          }
        }

        // Show error toast with specific message
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <div className="text-2xl font-bold text-primaryIndigo text-center py-4">
        Recover Password
      </div>
      <div className="flex flex-col gap-6">
        <FormInput
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
        <Button extraSmall primary type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Recovery Email"}
        </Button>
        <div className="flex justify-center">
          <span className="text-sm font-medium text-gray-700">
            Remember your password?
            <Link className="text-primaryIndigo pl-1 font-semibold" to="/login">
              Log In
            </Link>
          </span>
        </div>
      </div>
    </form>
  );
}

export default RecoverPassword;
