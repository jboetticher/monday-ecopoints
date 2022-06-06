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

  useEffect(() => {
    monday.listen("context", res => {
      setBoardCxt(res.data);
      console.log(res.data);
      
      monday.api(`query ($boardIds: [Int]) { boards (ids:$boardIds) { name items(limit:1) { name column_values { title text } } } }`,
        { variables: {boardIds: res.data.boardIds} }
      )
      .then(res => {
        console.log(res);
        setBoardData(res.data);
      });
    });
  }, []);

  

  return (
    <div className="App">
      <AttentionBox
        title="Carbon Cruncher"
        text={boardData?.boards[0].name}
        type="success"
      />
    </div>
  );
}

export default App;
