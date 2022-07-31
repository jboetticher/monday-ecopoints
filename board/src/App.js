import React, { useState, useEffect } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"
//Explore more Monday React Components here: https://style.monday.com/
import AttentionBox from "monday-ui-react-core/dist/AttentionBox.js"
import processTable from "./processTable";
import EcoWarriorList from './components/EcoWarriorList';
import SettingsPanel from './components/SettingsPanel';
import { EcoContextProvider } from "./components/EcoContext";
import DialogContentContainer from "monday-ui-react-core/dist/DialogContentContainer.js";

const monday = mondaySdk();
const endpoint = 'https://us-central1-monday-ecopoints.cloudfunctions.net';

const App = props => {

  const [boardCxt, setBoardCxt] = useState(null);
  const [boardData, setBoardData] = useState(null);
  const [settings, setSettings] = useState(null);
  const [personData, setPersonData] = useState(null);
  const [firebaseData, setFirebaseData] = useState(null);

  // Monday context listener
  useEffect(() => {
    monday.listen("context", res => {
      setBoardCxt(res.data);
      console.log(res.data);

      // Query for the boards and their data.
      const boardQuery =
        `query ($boardIds: [Int]) { boards (ids:$boardIds) { name items(limit:10000) { name column_values { title text type value } } } }`;
      monday.api(boardQuery, { variables: { boardIds: res.data.boardIds } })
        .then(res => {
          console.log("BOARDS", res.data);
          setBoardData(res.data);

          // Find the personId for every person assigned on the board.
          // TODO: make it only query if there are new users
          const peopleIdSet = new Set();
          res.data.boards[0].items.forEach(item => {
            item.column_values.filter(col => col.type === 'multiple-person')
              .forEach(col => {
                JSON.parse(col.value)
                  ?.personsAndTeams.filter(personOrTeam => personOrTeam.kind === 'person')
                  .forEach(person => { peopleIdSet.add(person.id) });
              });
          });
          return Array.from(peopleIdSet);
        })
        // Query for the images & names
        .then(personIds => {
          const personQuery = "query ($personIds:[Int]) { users (ids:$personIds) { photo_thumb name email } }";
          monday.api(personQuery, { variables: { personIds } })
            .then(res => {
              let personIdToImageDictionary = [];
              for (let i = 0; i < personIds.length; i++)
                personIdToImageDictionary[personIds[i]] = res.data.users[i];
              console.log("PEOPLE DATA", personIdToImageDictionary);
              setPersonData(personIdToImageDictionary);
            });
        })
    });

    monday.listen("settings", res => {
      setSettings(res.data);
      console.log('SETTINGS', res.data);
    });

  }, []);

  // Get board data when the board changes
  useEffect(() => {
    const boardId = boardCxt?.boardIds?.[0];
    if(boardId != null) {
      fetch(`${endpoint}/getBoardData?board=${boardId}`)
      .then(res => res.json())
      .then(res => {
        setFirebaseData(res);
        console.log("FIREBASE DATA", res);
      })
    }
  }, [boardCxt?.boardIds?.[0]]);

  // Calculate total eco points
  const { totalPoints, personToPoints } = processTable(settings, boardData);

  return (
    <div className="App">
      <EcoContextProvider>
        <EcoWarriorList
          boardCxt={boardCxt} personToPoints={personToPoints}
          totalPoints={totalPoints} personData={personData}
          firebaseData={firebaseData}
        />
        <SettingsPanel personToPoints={personToPoints} boardId={boardCxt?.boardIds?.[0]} />
      </EcoContextProvider>
    </div>
  );
}

export default App;
