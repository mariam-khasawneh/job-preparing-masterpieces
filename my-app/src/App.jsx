import { BrowserRouter, Routes, Route } from "react-router-dom";
// ===================================
import { Home } from "./Pages/Homepage/Home";
// ===================================
import Featuers from "./Pages/Featuers/Featuers";
import Resources from "./Pages/Resources-page/Resources";
import HowItWork from "./Pages/HowItWork/HowItWork";
import Contact from "./Pages/Contact/Contact";
import Pricing from "./Pages/Pricing/Pricing";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/404/NotFound";
import Navbar from "./Components/Navbar/Navbar";
import Courses from "./Pages/Courses/Courses";
import Coaching from "./Pages/Coaching/Coaching";
import Test from "./Pages/Test/Test";
import Course from "./Pages/Course/Course";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="featuers" element={<Featuers />} />
          <Route path="courses" element={<Courses />} />
          <Route path="coaching" element={<Coaching />} />
          <Route path="resources" element={<Resources />} />
          <Route path="how-It-work" element={<HowItWork />} />
          <Route path="contact" element={<Contact />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="test" element={<Test />} />
          <Route path="course" element={<Course />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
