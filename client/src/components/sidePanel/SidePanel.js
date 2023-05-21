import React from "react";

import "./SidePanel.scss";

const SidePanel = () => {
  return (
    <div className="side-panel">
      <div className="company-icon">
        <img
          width={256}
          height={256}
          src={"https://uploads-ssl.webflow.com/62a05f04f6ddb811f3b8c583/62a0645d595f068410f544df_Layer%202.svg"}
          alt="Logo"
        />
      </div>
    </div>
  );
};

export default SidePanel;
