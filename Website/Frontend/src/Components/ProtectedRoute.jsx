import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    toast.custom(<div>Must Login</div>);
    setTimeout(() => {}, 1500);

    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
