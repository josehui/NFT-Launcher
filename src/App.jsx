import "./style/App.css";
import About from "./Page/About";
import Nav from "./Component/NavBar";
import { Routes, Route } from "react-router";
import Home from "./Page/Home";
import Team from "./Page/Team";
const App = () => {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </div>
  );
};

export default App;
