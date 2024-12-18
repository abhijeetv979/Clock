import Clock from "./Clock";
import Layout from "./Layout";
import Stopwatch from "./Stopwatch";
import './App.css';
import { useState } from "react";

function App() {

  const [isActive, setIsActive] = useState(false);

  const isActiveHandler = (isActiveVal) => {
    setIsActive(isActiveVal);
  }

  return (
    <Layout>
      <Clock isActiveHandler={isActiveHandler}/>
      <Stopwatch isActive={isActive}/>
    </Layout>
  );
}

export default App;