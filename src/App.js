import {React} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './Views/Home';
import './App.css';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>{/*The specified path redirects to the component, in this case, defaults the app to Home*/}
        </Routes>
    </Router>
  )
}

export default App;
