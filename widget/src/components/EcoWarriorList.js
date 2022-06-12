import React, { useState, useEffect } from "react";
import "monday-ui-react-core/dist/main.css"
//Explore more Monday React Components here: https://style.monday.com/
import Flex from "monday-ui-react-core/dist/Flex";
import Avatar from "monday-ui-react-core/dist/Avatar";
import Divider from "monday-ui-react-core/dist/Divider";
import Heading from "monday-ui-react-core/dist/Heading";

/**
 * props.monday -> monday sdk
 */
const EcoWarriorList = props => {

  const pointsToPerson = props.pointsToPerson;
  const totalPoints = props.totalPoints;
  const textColor = props?.boardCxt?.theme === 'light' ? 'black' : 'white';

  try {
    const top3 = Object.entries(pointsToPerson)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2);

    return (
      <div>
        <Heading value="Top EcoPoint Earners" customColor={textColor} size="small" />
        <Divider />
        {top3.map((x, i) => (
          <Flex key={i}>
            <Avatar size='medium' />
            {i == 0 ?
              <>
                <h4 style={{ marginLeft: '1rem', marginRight: '1rem', width: '100%' }}>{x[0]}</h4>
                <h4 style={{ textAlign: 'right' }}>{x[1]}</h4>
              </> :
              <>
                <h5 style={{ marginLeft: '1rem', marginRight: '1rem', width: '100%' }}>{x[0]}</h5>
                <h5 style={{ textAlign: 'right' }}>{x[1]}</h5>
              </>
            }
          </Flex>
        ))}
        <Divider />
        <Flex>
          <p>{totalPoints}</p>
          <img
            src="https://cdn.discordapp.com/attachments/426940183112318976/985436645962686504/EcoPointx128.png"
            width='24px' style={{ marginRight: '4px', marginLeft: '4px' }}
          />
          <p>are available in total!</p>
        </Flex>
      </div>
    );
  }
  catch (err) {
    // Return skeleton
    console.error(err);
    return (
      <div>
        <Heading value="Top EcoPoint Earners" customColor={textColor} size="small" />
        <Divider />
        <div>skeliton :)</div>
      </div>);
  }
}

export default EcoWarriorList;
