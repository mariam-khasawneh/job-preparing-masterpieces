// React ====================================================
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Redux ====================================================
import { checkAuthState } from "./Store/Slices/authSlice";
import { useDispatch } from "react-redux";

// Extra Modules
import { Toaster } from "react-hot-toast";

// Public Pages  ====================================================
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
import ProtectedComponent from "./Pages/ProtectedComponent";
import ServicesPage from "./Pages/ServicesPage";
import CoachDetails from "./Pages/CoachDetails";

// Protected Pages  ===============================
import ProtectedRoute from "./Components/ProtectedRoute";
import UserProfilePage from "./Pages/User Profile/UserProfilePage";
import CoachProfileSettings from "./Pages/CoachProfile/CoachProfileSettings";
import CreateServiceForm from "./Pages/CoachProfile/CreateServiceForm";

// Dashboard Pages  ===============================
import DashboardHome from "./Dashboard/Pages/Home";
import DashLayout from "./Dashboard/Components/DashLayout";
import Members from "./Dashboard/Pages/Members";
import AdminCoachRequestsPage from "./Dashboard/Pages/AdminCoachRequestsPage";
import Messeges from "./Dashboard/Pages/Messeges";
import Coaches from "./Dashboard/Pages/Members/Coaches";
import Users from "./Dashboard/Pages/Members/Users";

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
  const adminDashboard = location.pathname.startsWith("/dashboard");
  return (
    <>
      {!isUserProfileRoute && !adminDashboard && <Navbar />}
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
        <Route path="services" element={<ServicesPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/coach-details" element={<CoachDetails />} />

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
              <UserProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="coach-profile-settings"
          element={
            <ProtectedRoute>
              <CoachProfileSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="create-service-form"
          element={
            <ProtectedRoute>
              <CreateServiceForm />
            </ProtectedRoute>
          }
        />

        {/* Dashboard */}
        <Route path="dashboard" element={<DashLayout />}>
          <Route path="home" element={<DashboardHome />} />
          <Route path="coach-requests" element={<AdminCoachRequestsPage />} />
          <Route path="messages" element={<Messeges />} />
          <Route path="members">
            <Route path="coaches" element={<Coaches />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Route>
      </Routes>
      {!isUserProfileRoute && !adminDashboard && <Footer />}
    </>
  );
}

export default App;
