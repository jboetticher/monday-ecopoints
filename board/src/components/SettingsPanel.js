import React, { useState, useEffect } from "react";
import "monday-ui-react-core/dist/main.css"
//Explore more Monday React Components here: https://style.monday.com/
import Flex from "monday-ui-react-core/dist/Flex";
import Avatar from "monday-ui-react-core/dist/Avatar";
import Divider from "monday-ui-react-core/dist/Divider";
import Heading from "monday-ui-react-core/dist/Heading";
import Slider from "monday-ui-react-core/dist/Slider";
import EcoPanel from "./EcoPanel";

/**
 * props.monday -> monday sdk
 */
const SettingsPanel = props => {

  const logoContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  }

  return (
    <div className="whitepanel">
      <div style={logoContainerStyle}>
      <img
        src="https://cdn.discordapp.com/attachments/426940183112318976/985436645962686504/EcoPointx128.png"
        style={{ margin: 'auto' }}
      />
      </div>

      <p>EcoPoints helps teams save the world one task at a time.</p>

      <Heading value="Monthly tons pledged" customColor={'black'} type={Heading.types.h4} />
      <Slider />
    </div>
  );

}

export default SettingsPanel;
