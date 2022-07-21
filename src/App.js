import {React} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './Views/Home';
import './App.css';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>{/*The "" path redirects to the component*/}
        </Routes>
    </Router>
  )
}

export default App;
