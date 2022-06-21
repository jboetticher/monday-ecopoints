import React, { useState, useEffect } from "react";
import "monday-ui-react-core/dist/main.css"
//Explore more Monday React Components here: https://style.monday.com/
import Flex from "monday-ui-react-core/dist/Flex";
import Avatar from "monday-ui-react-core/dist/Avatar";
import Divider from "monday-ui-react-core/dist/Divider";
import Heading from "monday-ui-react-core/dist/Heading";
import Skeleton from "monday-ui-react-core/dist/Skeleton";

/**
 * props.monday -> monday sdk
 */
const EcoWarriorList = props => {

  const personToPoints = props.personToPoints;
  const totalPoints = props.totalPoints;
  const textColor = props?.boardCxt?.theme === 'light' ? 'black' : 'white';
  const personData = props.personData;

  // TODO: add a check your settings prompt if there are no users

  try {
    // Retrieves top 3 ids and their points
    console.log("PERSON TO POINTS", personToPoints)
    const top3 = Object.entries(personToPoints)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
    if(top3 <= 0) throw new Error('No data yet');

    console.log(top3);

    return (
      <EcoPanel>
        <Heading value="Top ecopoint earners" customColor={textColor} type={Heading.types.h3} />
        {top3.map((x, i) => (
          <Flex key={i}>
            <Avatar size='medium' type='img' src={personData[x[0]]?.photo_thumb} />
            {i == 0 ?
              <>
                <h4 style={{ marginLeft: '1rem', marginRight: '1rem', width: '100%' }}>
                  {personData[x[0]]?.name ?? personData[x[0]]?.email ?? x[0]}
                </h4>
                <h4 style={{ textAlign: 'right' }}>{x[1]}</h4>
              </> :
              <>
                <h5 style={{ marginLeft: '1rem', marginRight: '1rem', width: '100%' }}>
                  {personData[x[0]]?.name ?? personData[x[0]]?.email ?? x[0]}
                </h5>
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
          <p>exist!</p>
        </Flex>
      </EcoPanel>
    );
  }
  catch (err) {
    // Return skeleton
    //console.log(err);
    const phonyArr = [0, 0, 0];
    return (
      <EcoPanel>
        <Heading value="Top ecopoint earners" customColor={textColor} type={Heading.types.h3} />
        {
          phonyArr.map((x, i) => 
            <Flex key={i} style={{marginBottom: '1.5rem'}}>
              <Skeleton type='circle' />
              <div style={{width: '1rem'}} />
              <Skeleton
                size="h3"
                type="text"
              />
            </Flex>
          )
        }
        <Divider />
        <Skeleton size="small" type="text" />
      </EcoPanel>);
  }
}

const EcoPanel = props => {
  return (
    <div className="ecopanel">
      {props.children}
    </div>
  )
}

export default EcoWarriorList;
