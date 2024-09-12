import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../Components/Form/Form";
import usePostData from "../Hooks/usePostData";
import axios from "axios";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isUserNameAvailable, setIsUserNameAvailable] = useState(null);
  const [isEmailAvailable, setIsEmailAvailable] = useState(null);
  const [isPasswordMatching, setIsPasswordMatching] = useState(null);

  const navigate = useNavigate();
  const { response, loading, error, postData } = usePostData(
    "http://localhost:3000/api/registration/signup"
  );

  const checkUserNameAvailability = async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/registration/check-username/${username}`
      );
      setIsUserNameAvailable(response.data.available);
    } catch (error) {
      console.error("Error checking username availability:", error);
    }
  };

  const checkEmailAvailability = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/registration/check-email/${email}`
      );
      setIsEmailAvailable(response.data.available);
    } catch (error) {
      console.error("Error checking email availability:", error);
    }
  };

  useEffect(() => {
    if (userName) {
      checkUserNameAvailability(userName);
    }
  }, [userName]);

  useEffect(() => {
    if (email) {
      checkEmailAvailability(email);
    }
  }, [email]);

  useEffect(() => {
    setIsPasswordMatching(password === confirmPassword);
  }, [password, confirmPassword]);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (isUserNameAvailable && isEmailAvailable && isPasswordMatching) {
      const userData = {
        first_name: firstName,
        last_name: lastName,
        user_name: userName,
        email,
        password,
      };

      await postData(userData);
    }
  };

  const isFormValid =
    firstName &&
    lastName &&
    isUserNameAvailable &&
    isEmailAvailable &&
    isPasswordMatching;

  // Handle successful signup
  React.useEffect(() => {
    if (response && response.message === "User registered successfully") {
      alert("Sign up successful!");
      navigate("/login");
    }
  }, [response, navigate]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 px-8 md:px-24 lg:px-44 gap-12 justify-center content-start py-24">
      <div
        className="bg-gradient-prim pc-4 md:p-16 rounded-xl"
        data-aos="fade-right"
      >
        <div className="flex flex-col place-content-between h-full">
          <Form
            title="Sign Up"
            formArr={[
              {
                label: "First Name",
                name: "firstName",
                type: "text",
                placeholder: "John",
                onChange: (e) => setFirstName(e.target.value),
              },
              {
                label: "Last Name",
                name: "lastName",
                type: "text",
                placeholder: "Doe",
                onChange: (e) => setLastName(e.target.value),
              },
              {
                label: "Email",
                name: "email",
                type: "email",
                placeholder: "email@example.com",
                onChange: (e) => setEmail(e.target.value),
                className:
                  isEmailAvailable === true
                    ? "text-green-500"
                    : isEmailAvailable === false
                    ? "text-red-500"
                    : "",
              },
              {
                label: "User Name",
                name: "userName",
                type: "text",
                placeholder: "johndoe123",
                onChange: (e) => setUserName(e.target.value),
                className:
                  isUserNameAvailable === true
                    ? "text-green-500"
                    : isUserNameAvailable === false
                    ? "text-red-500"
                    : "",
              },
              {
                label: "Password",
                name: "password",
                type: "password",
                placeholder: "********",
                onChange: (e) => setPassword(e.target.value),
              },
              {
                label: "Confirm Password",
                name: "confirmPassword",
                type: "password",
                placeholder: "********",
                onChange: (e) => setConfirmPassword(e.target.value),
                className: isPasswordMatching === false ? "text-red-500" : "",
              },
            ]}
            submitBtn="Sign Up"
            onSubmit={handleSignUp}
            isSubmitDisabled={!isFormValid}
          />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
