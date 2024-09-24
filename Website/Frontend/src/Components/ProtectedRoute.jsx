import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    // Show a toast notification
    toast.error("You must be logged in to access this page.", {
      duration: 3000, // Toast duration in milliseconds
    });

    // Redirect to login
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
