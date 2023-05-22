import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Layout, Button } from "antd";
import "./DashBoard.scss";
import GithubIntegrationCard from "../cards/GithubIntegrationCard";
import { getListOfRepositoriesForUser } from "../../api/githubIntegrationApi";
const { Sider, Content } = Layout;

const DashBoard = () => {
  let [userGitHubRepos, setUserGitHubRepos] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getListOfRepositoriesForUser().then(response => {
      setUserGitHubRepos(response);
    });
  }, []);
  return (
    <Layout className="dashboard">
      <Layout>
        <Sider width={350} className="sider"></Sider>
        <Content className="content">
          <div className="content-wrapper">
            <h1 className="title">Integrations</h1>
            <div className="cards">
              <GithubIntegrationCard repos={userGitHubRepos?.repos} applicationId={userGitHubRepos?.applicationId} />
            </div>
          </div>
        </Content>
        <Button
          className="sign-out"
          onClick={() => {
            navigate("/signin");
            localStorage.removeItem("user");
          }}
          type="primary"
          size={"middle"}>
          Sign out
        </Button>
      </Layout>
    </Layout>
  );
};

export default DashBoard;
