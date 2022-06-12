import React, { useState, useEffect } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"
//Explore more Monday React Components here: https://style.monday.com/
import AttentionBox from "monday-ui-react-core/dist/AttentionBox.js"
import processTable from "./processTable";
import EcoWarriorList from './components/EcoWarriorList';
import DialogContentContainer from "monday-ui-react-core/dist/DialogContentContainer.js";

const monday = mondaySdk();

const App = props => {

  const [boardCxt, setBoardCxt] = useState(null);
  const [boardData, setBoardData] = useState(null);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    monday.listen("context", res => {
      setBoardCxt(res.data);
      console.log(res.data);
      
      monday.api(`query ($boardIds: [Int]) { boards (ids:$boardIds) { name items(limit:10000) { name column_values { title text } } } }`,
        { variables: {boardIds: res.data.boardIds} }
      )
      .then(res => {
        console.log(res);
        setBoardData(res.data);
      });
    });
    
    monday.listen("settings", res => {
      setSettings(res.data);
      console.log(res.data);
    });

  }, []);

  // Calculate total eco points
  const { totalPoints, pointsToPerson } = processTable(settings, boardData);

  return (
    <div className="App">
      <EcoWarriorList boardCxt={boardCxt} pointsToPerson={pointsToPerson} totalPoints={totalPoints} />
    </div>
  );
}

export default App;
