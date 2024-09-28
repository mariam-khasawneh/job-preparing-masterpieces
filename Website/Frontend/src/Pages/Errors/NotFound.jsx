import { Section } from "../../Components/styles-components/containers";
import { Helmet } from "react-helmet-async";
function NotFound() {
  return (
    <>
      <Helmet>
        <title>JobReady | Page Not Found</title>
      </Helmet>
      <Section>404 : Not Found</Section>
    </>
  );
}

export default NotFound;
