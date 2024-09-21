// import { Section } from "../Components/styles-components/containers";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { login } from "../Store/Slices/authSlice";
// import { emailValidation } from "../Validation/validation";
// import FormInput from "../Components/FormInput";
// import Button from "../Components/Button/Button";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// // icons
// import { MdEmail } from "react-icons/md";
// import { FaUserAlt } from "react-icons/fa";
// import { FaLock } from "react-icons/fa";
// import { AiOutlineEyeInvisible, AiFillEye } from "react-icons/ai";

// function SignUp() {
//   return (
//     <Section className=" justify-center min-h-screen">
//       <div className="w-full md:w-1/2 lg:w-1/3 ">
//         <SignUpForm />
//       </div>
//     </Section>
//   );
// }

// function SignUpForm() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [formData, setFormData] = useState({
//     full_name: "",
//     user_name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setError((prev) => ({ ...prev, [name]: null }));
//   };

//   const handleTogglePassword = (field) => {
//     if (field === "password") {
//       setShowPassword((prev) => !prev);
//     } else {
//       setShowConfirmPassword((prev) => !prev);
//     }
//   };

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = {};

//     if (!emailValidation(formData.email).isValid) {
//       newErrors.email = "Please input a valid email";
//       isValid = false;
//     }

//     if (formData.full_name.length < 3) {
//       newErrors.full_name = "Full name must be at least 3 characters";
//       isValid = false;
//     }

//     if (formData.user_name.length < 3) {
//       newErrors.user_name = "Username must be at least 3 characters";
//       isValid = false;
//     }

//     if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//       isValid = false;
//     }

//     if (formData.confirmPassword.length < 1) {
//       newErrors.confirmPassword = "Please enter confirm password";
//       isValid = false;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//       isValid = false;
//     }

//     setError(newErrors);
//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsLoading(true);
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/auth/signup",
//         {
//           full_name: formData.full_name,
//           user_name: formData.user_name,
//           email: formData.email,
//           password: formData.password,
//         },
//         {
//           withCredentials: true,
//         }
//       );

//       if (response.data.token) {
//         console.log("Login successful", response.data);
//         dispatch(
//           login({ user: response.data.user /*, token: response.data.token*/ })
//         );
//         console.log("Signup successful", response.data);
//         navigate("/home");
//       }
//     } catch (error) {
//       if (error.response && error.response.data) {
//         setError(error.response.data);
//       } else {
//         setError({ general: "An error occurred. Please try again." });
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="w-full">
//       <div className="text-2xl font-bold text-primaryIndigo text-center py-4">
//         Create an account
//       </div>
//       <div className="flex flex-col gap-6">
//         <FormInput
//           label="Email Address"
//           placeholder="myemailaddress@example.com"
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           error={error.email}
//           leftIcon={<MdEmail className="text-slate-400" size={14} />}
//         />
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//           <FormInput
//             label="Full Name"
//             placeholder="Full Name"
//             type="text"
//             name="full_name"
//             value={formData.full_name}
//             onChange={handleChange}
//             error={error.full_name}
//             leftIcon={<FaUserAlt className="text-slate-400" size={14} />}
//           />
//           <FormInput
//             label="User Name"
//             placeholder="Username"
//             type="text"
//             name="user_name"
//             value={formData.user_name}
//             onChange={handleChange}
//             error={error.user_name}
//             leftIcon={<FaUserAlt className="text-slate-400" size={14} />}
//           />
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//           <FormInput
//             label="Password"
//             placeholder="Password"
//             type={showPassword ? "text" : "password"}
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             error={error.password}
//             leftIcon={<FaLock className="text-slate-400" size={14} />}
//             rightIcon={
//               showPassword ? (
//                 <AiOutlineEyeInvisible
//                   className="text-slate-400 cursor-pointer"
//                   onClick={() => handleTogglePassword("password")}
//                   size={20}
//                 />
//               ) : (
//                 <AiFillEye
//                   className="text-slate-400 cursor-pointer"
//                   onClick={() => handleTogglePassword("password")}
//                   size={20}
//                 />
//               )
//             }
//           />
//           <FormInput
//             label="Confirm Password"
//             placeholder="Password"
//             type={showConfirmPassword ? "text" : "password"}
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             error={error.confirmPassword}
//             leftIcon={<FaLock className="text-slate-400" size={14} />}
//             rightIcon={
//               showConfirmPassword ? (
//                 <AiOutlineEyeInvisible
//                   className="text-slate-400 cursor-pointer"
//                   onClick={() => handleTogglePassword("confirmPassword")}
//                   size={20}
//                 />
//               ) : (
//                 <AiFillEye
//                   className="text-slate-400 cursor-pointer"
//                   onClick={() => handleTogglePassword("confirmPassword")}
//                   size={20}
//                 />
//               )
//             }
//           />
//         </div>
//         {error.general && (
//           <div className="text-red-500 text-sm">{error.general}</div>
//         )}
//         <Button extraSmall primary type="submit" disabled={isLoading}>
//           {isLoading ? "Signing up..." : "Sign Up"}
//         </Button>
//       </div>
//     </form>
//   );
// }

// export default SignUp;

import { Section } from "../Components/styles-components/containers";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { login } from "../Store/Slices/authSlice";
import { emailValidation } from "../Validation/validation";
import FormInput from "../Components/FormInput";
import Button from "../Components/Button/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// icons
import { MdEmail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { AiOutlineEyeInvisible, AiFillEye } from "react-icons/ai";
import Cookies from "js-cookie";

function SignUp() {
  return (
    <Section className="justify-center min-h-screen">
      <div className="w-full md:w-1/2 lg:w-1/3">
        <SignUpForm />
      </div>
    </Section>
  );
}

function SignUpForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    full_name: "",
    user_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [emailAvailable, setEmailAvailable] = useState(null);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length < 3) return;
      try {
        const response = await axios.get(
          `http://localhost:3000/api/auth/check-username/${username}`
        );
        setUsernameAvailable(response.data.available);
      } catch (error) {
        console.error("Error checking username:", error);
      }
    }, 500),
    []
  );

  const checkEmail = useCallback(
    debounce(async (email) => {
      if (!emailValidation(email).isValid) return;
      try {
        const response = await axios.get(
          `http://localhost:3000/api/auth/check-email/${email}`
        );
        setEmailAvailable(response.data.available);
      } catch (error) {
        console.error("Error checking email:", error);
      }
    }, 500),
    []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: null }));

    if (name === "user_name") {
      checkUsername(value);
    } else if (name === "email") {
      checkEmail(value);
    }
  };

  const handleTogglePassword = (field) => {
    if (field === "password") {
      setShowPassword((prev) => !prev);
    } else {
      setShowConfirmPassword((prev) => !prev);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!emailValidation(formData.email).isValid) {
      newErrors.email = "Please input a valid email";
      isValid = false;
    }

    if (formData.full_name.length < 3) {
      newErrors.full_name = "Full name must be at least 3 characters";
      isValid = false;
    }

    if (formData.user_name.length < 3) {
      newErrors.user_name = "Username must be at least 3 characters";
      isValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (formData.confirmPassword.length < 1) {
      newErrors.confirmPassword = "Please enter confirm password";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (!usernameAvailable) {
      newErrors.user_name = "This username is already taken";
      isValid = false;
    }

    if (!emailAvailable) {
      newErrors.email = "This email is already in use";
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
        "http://localhost:3000/api/auth/signup",
        {
          full_name: formData.full_name,
          user_name: formData.user_name,
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.token) {
        const { token } = response.data;
        Cookies.set("token", token, {
          expires: 7,
          secure: true,
        });
        console.log("Login successful", response.data);
        dispatch(login({ user: response.data.user }));
        console.log("Signup successful", response.data);
        navigate("/home");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError({ general: "An error occurred. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="text-2xl font-bold text-primaryIndigo text-center py-4">
        Create an account
      </div>
      <div className="flex flex-col gap-6">
        <FormInput
          label="Email Address"
          placeholder="myemailaddress@example.com"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={error.email}
          leftIcon={<MdEmail className="text-slate-400" size={14} />}
        />
        {emailAvailable !== null && (
          <div
            className={`text-sm ${
              emailAvailable ? "text-green-500" : "text-red-500"
            }`}
          >
            {emailAvailable ? "Email is available" : "Email is already in use"}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormInput
            label="Full Name"
            placeholder="Full Name"
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            error={error.full_name}
            leftIcon={<FaUserAlt className="text-slate-400" size={14} />}
          />
          <FormInput
            label="User Name"
            placeholder="Username"
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            error={error.user_name}
            leftIcon={<FaUserAlt className="text-slate-400" size={14} />}
          />
        </div>
        {usernameAvailable !== null && (
          <div
            className={`text-sm ${
              usernameAvailable ? "text-green-500" : "text-red-500"
            }`}
          >
            {usernameAvailable
              ? "Username is available"
              : "Username is already taken"}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  onClick={() => handleTogglePassword("password")}
                  size={20}
                />
              ) : (
                <AiFillEye
                  className="text-slate-400 cursor-pointer"
                  onClick={() => handleTogglePassword("password")}
                  size={20}
                />
              )
            }
          />
          <FormInput
            label="Confirm Password"
            placeholder="Password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={error.confirmPassword}
            leftIcon={<FaLock className="text-slate-400" size={14} />}
            rightIcon={
              showConfirmPassword ? (
                <AiOutlineEyeInvisible
                  className="text-slate-400 cursor-pointer"
                  onClick={() => handleTogglePassword("confirmPassword")}
                  size={20}
                />
              ) : (
                <AiFillEye
                  className="text-slate-400 cursor-pointer"
                  onClick={() => handleTogglePassword("confirmPassword")}
                  size={20}
                />
              )
            }
          />
        </div>
        {error.general && (
          <div className="text-red-500 text-sm">{error.general}</div>
        )}
        <Button extraSmall primary type="submit" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </Button>
      </div>
    </form>
  );
}

export default SignUp;
