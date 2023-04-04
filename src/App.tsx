import { useState } from "react";
import "./App.css";
import Locales from "./views/locales";
import { InteractiveContainer } from "./components/DialogContainer";

function App() {
  return (
    <div className="App">
      <InteractiveContainer>
        <Locales />
      </InteractiveContainer>
    </div>
  );
}

export default App;
