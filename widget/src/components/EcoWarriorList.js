import React, { useState, useContext } from "react";
import "monday-ui-react-core/dist/main.css"
import Flex from "monday-ui-react-core/dist/Flex";
import Avatar from "monday-ui-react-core/dist/Avatar";
import Divider from "monday-ui-react-core/dist/Divider";
import Heading from "monday-ui-react-core/dist/Heading";
import Skeleton from "monday-ui-react-core/dist/Skeleton";
import Tab from "monday-ui-react-core/dist/Tab";
import TabList from "monday-ui-react-core/dist/TabList";
import TabsContext from "monday-ui-react-core/dist/TabsContext";
import TabPanel from "monday-ui-react-core/dist/TabPanel";
import TabPanels from "monday-ui-react-core/dist/TabPanels";
import EcoPanel from "./EcoPanel";

/**
 * props.monday -> monday sdk
 */
const EcoWarriorList = props => {

  const personToPoints = props.personToPoints;
  const totalPoints = props.totalPoints;
  const personData = props.personData;
  const firebaseData = props.firebaseData;
  const refreshFirebaseData = props.refreshFirebaseData;

  try {
    // Retrieves top 3 ids and their points
    const topUsers = Object.entries(personToPoints)
      .sort((a, b) => b[1] - a[1]);
    if (topUsers.length <= 0) throw new Error('No data yet');

    return (
      <EcoPanel>
        <Heading value="Ecopoint earners" customColor={'black'} type={Heading.types.h2} />
        <TabsContext>
          <TabList size="md">
            <Tab>Top Current</Tab>
            <Tab onClick={refreshFirebaseData}>Previous Champions</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {topUsers.map((x, i) => (
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
            </TabPanel>
            <TabPanel>
              {firebaseData?.previousChampions?.map((x, i) => (
                <Flex key={i}>
                  <Avatar size='medium' type='img' src={personData[x.id]?.photo_thumb} />
                  <h4 style={{ marginLeft: '1rem' }}>{(new Date(x.date)).toLocaleDateString()}</h4>
                  <h4 style={{ marginLeft: '1rem', marginRight: '1rem', width: '100%' }}>
                    {personData[x.id]?.name ?? personData[x.id]?.email ?? x.id}
                  </h4>
                  <h4 style={{ textAlign: 'right' }}>{x.points}</h4>
                </Flex>
              ))}
            </TabPanel>
          </TabPanels>
        </TabsContext>
        <Divider />
        <Flex>
          <p>{totalPoints}</p>
          <img
            src="./EcoPointx128.png"
            width='24px' style={{ marginRight: '4px', marginLeft: '4px' }}
          />
          <p>exist! {firebaseData?.tonsSum ?? 0} total tons sequestered.</p>
        </Flex>
      </EcoPanel>
    );
  }
  catch (err) {
    // Return skeleton
    console.log(err);
    const phonyArr = [0, 0, 0];
    return (
      <EcoPanel>
        <Heading value="Top ecopoint earners" customColor={'black'} type={Heading.types.h2} />
        {
          phonyArr.map((x, i) =>
            <Flex key={i} style={{ marginBottom: '1.5rem' }}>
              <Skeleton type='circle' />
              <div style={{ width: '1rem' }} />
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

export default EcoWarriorList;
