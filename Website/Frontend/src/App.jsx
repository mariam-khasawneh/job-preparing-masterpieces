import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
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
import RecoverPassword from "./Pages/RecoverPassword";
import ResetPassword from "./Pages/ResetPassword";
import ScheduleMeeting from "./Pages/ScheduleMeeting";
import SignUp2 from "./Pages/SignUp2";
import SignUp from "./Pages/SignUp";
import VideoChat from "./Pages/videoChat";
import UserProfilePage from "./Pages/User Profile/UserProfilePage";
import ProtectedRoute from "./Components/ProtectedRoute";
import ProtectedComponent from "./Pages/ProtectedComponent";

// ===============================

import { checkAuthState } from "./Store/Slices/authSlice";

// ========================

import AdminCoachRequestsPage from "./Dashboard/Pages/AdminCoachRequestsPage";

// Dashboard
import DashboardHome from "./Dashboard/Pages/Home";
import DashLayout from "./Dashboard/Components/DashLayout";
import Members from "./Dashboard/Pages/Members";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" />
        <AuthWrapper />{" "}
      </BrowserRouter>
    </>
  );
}

function AuthWrapper() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  return <Content />;
}

function Content() {
  const location = useLocation();
  const isUserProfileRoute = location.pathname.startsWith("/user-profile");
  return (
    <>
      {!isUserProfileRoute && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="featuers" element={<Featuers />} />
        <Route path="courses" element={<Courses />} />
        <Route path="coaching" element={<Coaching />} />
        <Route path="resources" element={<Resources />} />
        <Route path="recovery" element={<RecoverPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
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
        <Route
          path="AdminCoachRequestsPage"
          element={<AdminCoachRequestsPage />}
        />

        {/* Protected Routes */}
        <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <ProtectedComponent />
            </ProtectedRoute>
          }
        />
        <Route
          path="user-profile"
          element={
            <ProtectedRoute>
              {" "}
              <UserProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Dashboard */}
        <Route path="dashboard" element={<DashLayout />}>
          <Route path="home" element={<DashboardHome />} />
          <Route path="members" element={<Members />} />
        </Route>
      </Routes>
      {!isUserProfileRoute && <Footer />}
    </>
  );
}

export default App;
