import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../../App";

const useAuthenticatedContext = (redirectPath?: string): void => {
  const isAuthenticated = useContext<boolean>(SessionContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (redirectPath) {
      if (isAuthenticated) {
        navigate(redirectPath);
      } else {
        navigate("/");
      }
    } else {
      if (!isAuthenticated) navigate("/");
    }
  }, [isAuthenticated, navigate, redirectPath]);
};

export default useAuthenticatedContext;
