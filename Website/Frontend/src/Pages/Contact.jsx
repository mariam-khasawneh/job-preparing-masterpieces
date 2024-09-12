import { Section } from "../Components/styles-components/containers";
import Form from "../Components/Form/Form";
import { useState } from "react";
function Contact() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const handleLogin = "";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 px-8 md:px-24 lg:px-44 gap-12  justify-center content-start py-24">
      <div
        className="bg-gradient-prim pc-4 md:p-16 rounded-xl"
        data-aos="fade-right"
      >
        <div className="flex flex-col place-content-between h-full">
          <Form
            title={"Contact Us"}
            formArr={[
              {
                label: "Email",
                name: "email",
                type: "text",
                placeholder: "email@example.com",
                onChange: (e) => setEmail(e.target.value),
              },
              {
                label: "Password",
                name: "password",
                type: "password",
                placeholder: "",
                onChange: (e) => setPassword(e.target.value),
              },
              {
                label: "Confirm Password",
                name: "confirm-password",
                type: "password",
                placeholder: "",
                onChange: (e) => setConfirmPassword(e.target.value),
              },
            ]}
            submitBtn={"Login"}
            onSubmit={handleLogin}
            withEvent={true}
            // textares={true}
            redirect={{
              label: "Do have an account?",
              link: {
                label: "Login",
                to: "/login",
              },
            }}
          />
        </div>
      </div>
      <div className="" data-aos="fade-left">
        {/* <img
          src={login}
          alt="Event"
          className="rounded-lg  invisible lg:visible"
          style={{ width: "100%", height: "auto" }}
        /> */}
      </div>
    </div>
  );
}

export default Contact;
