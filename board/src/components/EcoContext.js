import React, { useState } from "react";

const EcoContext = React.createContext();

export function EcoContextProvider(props) {
    const [champion, setChampion] = useState(0);

    return(
        <EcoContext.Provider value={{ champion, setChampion }}>
            {props.children}
        </EcoContext.Provider>
    );
}

export default EcoContext;
