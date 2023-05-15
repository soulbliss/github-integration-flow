import React from "react";
import { DotsIcon, WisdomIcon } from "../icons/Icons";
import PoseImage from "../icons/POSE_02.png";

import "./SidePanel.scss";

const SidePanel = () => {
  return (
    <div className="side-panel">
      <div className="company-icon">
        <WisdomIcon />
      </div>
      <div className="side-panel-footer">
        <div className="pose-image">
          <img width={165} height={219} src={PoseImage} alt="Pose" />
        </div>
        <div className="footer-wrapper">
          <div className="footer-upper-block">
            <div className="title">Welcome back!</div>
            <div className="sub-title">
              Sign In to find opportunities that match your interests. We have both part-time and full-time roles that can be done online and
              in-person.
            </div>
            <DotsIcon />
          </div>
          <div className="footer-contact-block">Please contact us at +91-9380644532 if you need any assistance.</div>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
