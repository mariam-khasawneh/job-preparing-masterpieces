import { BrowserRouter, Routes, Route } from "react-router-dom";

// ===================================
import Appointment from "./Pages/Appointment";
import Article from "./Pages/Article";
import Blog from "./Pages/Blog";
import CoachProfile from "./Pages/CoachProfile";
import Coaching from "./Pages/Coaching";
import Contact from "./Pages/Contact";
import Course from "./Pages/Course";
import Courses from "./Pages/Courses";
import Featuers from "./Pages/Featuers";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Navbar from "./Components/Navbar/Navbar";
import NotFound from "./Pages/Errors/NotFound";
import Pricing from "./Pages/Pricing";
import Resources from "./Pages/Resources";
import ScheduleMeeting from "./Pages/ScheduleMeeting";
import SignUp2 from "./Pages/SignUp2";
import SignUp from "./Pages/SignUp";
import VideoChat from "./Pages/videoChat";

// ===================================
// Dashboard
import DashboardHome from "./Dashboard/Pages/Home";
import DashLayout from "./Dashboard/Components/DashLayout";
import Members from "./Dashboard/Pages/Members";

// ===================================
// Context
import { AuthProvider } from "./Context/AuthContext";
// ===================================

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
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
            <Route path="signup2" element={<SignUp2 />} />
            <Route path="login" element={<Login />} />
            <Route path="course" element={<Course />} />
            <Route path="coach-profile" element={<CoachProfile />} />
            <Route path="blog" element={<Blog />} />
            <Route path="article" element={<Article />} />
            <Route path="appointment" element={<Appointment />} />
            <Route path="videoChat" element={<VideoChat />} />
            <Route path="ScheduleMeeting" element={<ScheduleMeeting />} />
            <Route path="*" element={<NotFound />} />

            {/* Dashboard */}
            <Route path="dashboard" element={<DashLayout />}>
              <Route path="home" element={<DashboardHome />} />
              <Route path="members" element={<Members />} />
            </Route>
          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
