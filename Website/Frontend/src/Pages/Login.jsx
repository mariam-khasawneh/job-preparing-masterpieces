import LoginForm from "../Forms/LoginForm";
import { Section } from "../Components/styles-components/containers";

function Login() {
  return (
    <Section className=" justify-center ">
      <div className="w-full md:w-1/2 lg:w-1/3 ">
        <LoginForm />
      </div>
    </Section>
  );
}

export default Login;
