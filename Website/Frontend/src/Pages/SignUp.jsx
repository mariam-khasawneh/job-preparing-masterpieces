import { Section } from "../Components/styles-components/containers";
import SignUpForm from "../Forms/SignUpForm";
function SignUp() {
  return (
    <Section className=" justify-center ">
      <div className="w-full md:w-1/2 lg:w-1/3 ">
        <SignUpForm />
      </div>
    </Section>
  );
}

export default SignUp;
