import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmail } from "../../../src/api/authApi";

const EmailVerificationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get("userId");
    const token = queryParams.get("token");
    verifyEmail({ userId, token }).then(redirectURL => {
      navigate(redirectURL);
    });
  }, [navigate, location.search]);

  return <div>Verify Email Page</div>;
};

export default EmailVerificationPage;
