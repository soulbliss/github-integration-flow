import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sendAuthorizationToken } from "../../api/githubIntegrationApi";

const CallBackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const authorizationCode = queryParams.get("code");
  const installationId = queryParams.get("installation_id");
  useEffect(() => {
    sendAuthorizationToken(authorizationCode, installationId).then(redirectURL => {
      navigate(redirectURL);
    });
  }, [installationId]);
  return <div>Authorizing...</div>;
};

export default CallBackPage;
