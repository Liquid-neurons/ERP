import Home from "./components/home";
import Emp_TC from "./components/Emp_TC";
import Emp_TC_OPT from "./components/Emp_TC_OPT";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="Emp_TC" element={<Emp_TC/>}/>
      <Route path="Emp_TC_OPT" element={<Emp_TC_OPT/>}/>
      </Routes> 
      </Router>
    </div>
  );
}

export default App;
