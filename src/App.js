import React, { useState, useEffect } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"
//Explore more Monday React Components here: https://style.monday.com/
import AttentionBox from "monday-ui-react-core/dist/AttentionBox.js"

const monday = mondaySdk();

const App = props => {

  const [boardCxt, setBoardCxt] = useState(null);
  const [boardData, setBoardData] = useState(null);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    monday.listen("context", res => {
      setBoardCxt(res.data);
      
      monday.api(`query ($boardIds: [Int]) { boards (ids:$boardIds) { name items(limit:1000) { name column_values { title text } } } }`,
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
  let ecoPoints = 0;
  let ecoPointColumn = 'EcoPoints';
  if(settings != null && settings.ecopointcolumn != null && settings.ecopointcolumn !== '') 
    ecoPointColumn = settings.ecopointcolumn;
  console.log(ecoPointColumn);
  if(boardData) {
    for(let b of boardData.boards) {
      for(let item of b.items) {
        for(let column of item.column_values) {
          if(column.title === ecoPointColumn) {
            const points = parseInt(column.text);
            console.log('adding eco points for ' + item.name, points);
            if(!isNaN(points)) ecoPoints += points;
          }
        }
      }
    }
  }

  return (
    <div className="App">
      <AttentionBox
        title="Carbon Cruncher"
        text={'Total Eco Points: ' + ecoPoints}
        type="success"
      />
    </div>
  );
}

export default App;
