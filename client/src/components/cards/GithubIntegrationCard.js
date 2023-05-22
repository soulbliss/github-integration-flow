import React from "react";
import { Button, Card, Space } from "antd";
import "./GithubIntegrationCard.scss";
const GithubIntegrationCard = ({ repos, applicationId }) => {
  const isReposPresent = repos?.length;
  return (
    <Card
      className="card"
      title="Github integration"
      bordered={false}
      hoverable
      style={{
        width: 300
      }}>
      <div>
        <div className="logo">
          <img height={128} width={128} alt={"logo"} src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"></img>
        </div>
        {applicationId && <p className="sub-title-card">App id: {applicationId}</p>}
        {!isReposPresent && (
          <Button href={`https://github.com/apps/integration-flow/installations/new`} type="primary" size={"middle"}>
            Connect
          </Button>
        )}
        <div>
          {repos &&
            repos?.map(repo => {
              return (
                <Card>
                  <a className="repo-title" href={repo.html_url}>
                    {repo.full_name}
                  </a>
                </Card>
              );
            })}
        </div>
      </div>
    </Card>
  );
};

export default GithubIntegrationCard;
