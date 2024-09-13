import { useState } from "react";
import { emailValidation } from "../Validation/validation";
import FormInput from "../Components/FormInput";
import Button from "../Components/Button/Button";
import Popup from "../Components/Popup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// icons
import { MdEmail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { AiOutlineEyeInvisible, AiFillEye } from "react-icons/ai";

function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_name_or_email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: null }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.user_name_or_email) {
      newErrors.user_name_or_email = "Username or email is required";
      isValid = false;
    }

    if (formData.password.length < 1) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setError(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          user_name: formData.user_name_or_email.includes("@")
            ? undefined
            : formData.user_name_or_email,
          email: formData.user_name_or_email.includes("@")
            ? formData.user_name_or_email
            : undefined,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.token) {
        console.log("Login successful", response.data);
        setPopup({
          show: true,
          message: "Login successful!",
          type: "success",
        });
        navigate("/home");
      }
    } catch (error) {
      let errorMessage = "An error occurred. Please try again.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }
      setPopup({
        show: true,
        message: errorMessage,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const closePopup = () => {
    setPopup({ show: false, message: "", type: "" });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="text-2xl font-bold text-primaryIndigo text-center py-4">
          Log In
        </div>
        <div className="flex flex-col gap-6">
          <FormInput
            label="Username or Email"
            placeholder="Username or Email"
            type="text"
            name="user_name_or_email"
            value={formData.user_name_or_email}
            onChange={handleChange}
            error={error.user_name_or_email}
            leftIcon={<FaUserAlt className="text-slate-400" size={14} />}
          />
          <FormInput
            label="Password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={error.password}
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
          {error.general && (
            <div className="text-red-500 text-sm">{error.general}</div>
          )}
          <Button extraSmall primary type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log In"}
          </Button>
        </div>
      </form>
      {popup.show && (
        <Popup message={popup.message} type={popup.type} onClose={closePopup} />
      )}
    </>
  );
}

export default LoginForm;
