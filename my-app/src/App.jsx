import { BrowserRouter, Routes, Route } from "react-router-dom";
// ===================================
import { Home } from "./Pages/Homepage/Home";
import Featuers from "./Pages/Featuers/Featuers";
import Resources from "./Pages/Resources-page/Resources";
import Contact from "./Pages/Contact/Contact";
import Pricing from "./Pages/Pricing/Pricing";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/Errors/NotFound";
import Navbar from "./Components/Navbar/Navbar";
import Courses from "./Pages/Courses/Courses";
import Coaching from "./Pages/Coaching/Coaching";
import Course from "./Pages/Course/Course";
import CoachProfile from "./Pages/CoachProfile/CoachProfile";
import Blog from "./Pages/Blog/Blog";
import Article from "./Pages/Blog/Article";
import Appointment from "./Pages/Appointment/Appointment";

// ===================================
// Dashboard
import DashboardHome from "./Dashboard/Pages/Home";
import DashLayout from "./Dashboard/Components/DashLayout";
import Members from "./Dashboard/Pages/Members";

// ===================================
function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="featuers" element={<Featuers />} />
          <Route path="courses" element={<Courses />} />
          <Route path="coaching" element={<Coaching />} />
          <Route path="resources" element={<Resources />} />
          <Route path="contact" element={<Contact />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="course" element={<Course />} />
          <Route path="coach-profile" element={<CoachProfile />} />
          <Route path="blog" element={<Blog />} />
          <Route path="article" element={<Article />} />
          <Route path="appointment" element={<Appointment />} />
          <Route path="*" element={<NotFound />} />

          {/* Dashboard */}
          <Route path="dashboard" element={<DashLayout />}>
            <Route path="home" element={<DashboardHome />} />
            <Route path="members" element={<Members />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
