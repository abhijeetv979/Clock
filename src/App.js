import Clock from "./Clock";
import Layout from "./Layout";
import Stopwatch from "./Stopwatch";
import './App.css';

function App() {
  return (
    <Layout>
      <Clock />
      <Stopwatch />
    </Layout>
  );
}

export default App;