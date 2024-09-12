import { useState } from "react";
import { emailValidation } from "../Validation/validation";
import FormInput from "../Components/FormInput";
import Button from "../Components/Button/Button";

//icons
import { MdEmail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { AiOutlineEyeInvisible, AiFillEye } from "react-icons/ai";

// import { BsFillShieldLockFill } from "react-icons/fa";

function SignUpForm() {
  const [fname, setFName] = useState("");
  const [uname, setUName] = useState("");
  const [email, setEmil] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handelTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleError = (err, field) => {
    setError((prev) => ({ ...prev, [field]: err }));
  };

  const validate = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!email) {
      handleError("Please input email address", "email");
      isValid = false;
    } else if (!emailValidation(email).isValid) {
      handleError("Please input a valid email", "email");
      isValid = false;
    }

    if (fname?.length < 3) {
      handleError("Please input fullname", "name");
      isValid = false;
    }

    if (!password) {
      handleError("Please input password", "password");
      isValid = false;
    } else if (password.length < 6) {
      handleError("Min password length of 6", "password");
    }

    if (isValid) {
      alert("sign up successfult=y");
    } else {
      alert(handleError);
    }
  };

  return (
    <form onSubmit={validate} className=" p-10rounded-lg w-1/2">
      <div className="text-2xl font-bold text-primaryIndigo text-center py-4">
        Creat an account
      </div>
      <div className="flex flex-col gap-6">
        <FormInput
          label={"Email Adress"}
          placeholder={"myemailaddress@example.com"}
          type={"email"}
          value={email}
          onChange={(text) => setEmil(text)}
          required
          validator={emailValidation}
          name={"email"}
          error={error.email}
          resetError={() => handleError(null, "email")}
          // leftIcon={<MdEmail className="text-slate-400" size={14} />}
        />
        <div className="grid grid-cols-2 gap-3">
          <FormInput
            label={"Full Name"}
            placeholder={"Name"}
            type={"text"}
            value={fname}
            onChange={(text) => setFName(text)}
            required
            name={"name"}
            error={error.email}
            resetError={() => handleError(null, "name")}
            // leftIcon={<FaUserAlt className="text-slate-400" size={14} />}
          />
          <FormInput
            label={"User Name"}
            placeholder={"User name"}
            type={"text"}
            value={uname}
            onChange={(text) => setFName(text)}
            required
            name={"email"}
            error={error.email}
            resetError={() => handleError(null, "name")}
            // leftIcon={<FaUserAlt className="text-slate-400" size={14} />}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormInput
            label={"Password"}
            placeholder={"Password"}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(text) => setPassword(text)}
            required
            name={"password"}
            error={error.password}
            resetError={() => handleError(null, "password")}
            // leftIcon={<FaLock className="text-slate-400" size={14} />}
            rightIcon={
              showPassword ? (
                <AiOutlineEyeInvisible
                  className="text-slate-400 cursor-pointer"
                  onClick={handelTogglePassword}
                  size={20}
                />
              ) : (
                <AiFillEye
                  className="text-slate-400 cursor-pointer"
                  onClick={handelTogglePassword}
                  size={20}
                />
              )
            }
          />
          <FormInput
            label={"Confirm Password"}
            placeholder={"Password"}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(text) => setPassword(text)}
            required
            name={"password"}
            error={error.password}
            resetError={() => handleError(null, "password")}
            // leftIcon={<FaLock className="text-slate-400" size={14} />}
            rightIcon={
              showPassword ? (
                <AiOutlineEyeInvisible
                  className="text-slate-400 cursor-pointer"
                  onClick={handelTogglePassword}
                  size={20}
                />
              ) : (
                <AiFillEye
                  className="text-slate-400 cursor-pointer"
                  onClick={handelTogglePassword}
                  size={20}
                />
              )
            }
          />
        </div>
        <Button larg primary type="submit" onClick={""}>
          Submit
        </Button>
      </div>
    </form>
  );
}

export default SignUpForm;
