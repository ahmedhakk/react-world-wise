import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { isAuthedticated } = useAuth();
  const navigate = useNavigate();

  // useEffect is already excuted after the component is been rendered
  useEffect(() => {
    if (!isAuthedticated) navigate("/");
  }, [isAuthedticated, navigate]);

  // so our component is trying to render children then run the effect
  // so we need to render out children conditionaly
  return isAuthedticated ? children : null;
};

export default ProtectedRoute;
