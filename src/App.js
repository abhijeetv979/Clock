import Clock from "./Clock";
import Layout from "./Layout";
import Stopwatch from "./Stopwatch";
import './App.css';
import {  useEffect, useState } from "react";

function App() {

  const [isActive, setIsActive] = useState(false);
  const [count, setCount] = useState(30);

  const isActiveHandler = (isActiveVal) => {
    setIsActive(isActiveVal);
  }

  useEffect(()=>{
    if(isActive){
      setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    }
  },[isActive])

  useEffect(()=>{
    if(!isActive){
      setCount(30);
    }
  },[isActive])


  return (
    <Layout>
      {isActive && <h1>Wait for {count} seconds!</h1>}
      <Clock isActiveHandler={isActiveHandler} />
      <Stopwatch isActive={isActive} />
    </Layout>
  );
}

export default App;