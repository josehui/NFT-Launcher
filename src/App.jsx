import './App.css'
import Hero from './Hero'
import About from './About'
import Nav from './NavBar'
import Uploader from './FileUploader'
import {
  Routes,
  Route,
} from "react-router";

function App() {

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<><Hero /><Uploader /></>} />
      </Routes>


    </div>
  )
}

export default App
