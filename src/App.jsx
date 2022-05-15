import './App.css'
import Hero from './Hero'
import About from './About'
import Nav from './NavBar'
import Uploader from './FileUploader'
import {
  Routes,
  Route,
} from "react-router";
import CallToActionLeft from './CallToAction'

function App() {

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<><Hero /><Uploader /><CallToActionLeft /></>} />
      </Routes>


    </div>
  )
}

export default App
