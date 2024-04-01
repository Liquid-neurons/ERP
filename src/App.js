import Home from "./components/home";
import Emp_TC from "./components/Emp_TC";
import Emp_TC_OPT from "./components/Emp_TC_OPT";
import Emp_master from "./components/Emp_master";
import STUDENT_MASTER from "./components/STUDENT_MASTER";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="Emp_TC" element={<Emp_TC/>}/>
      <Route path="Emp_TC_OPT" element={<Emp_TC_OPT/>}/>
      <Route path="Emp_master" element={<Emp_master/>}/>
      <Route path="STUDENT_MASTER" element={<STUDENT_MASTER/>}/>
      </Routes> 
      </Router>
    </div>
  );
}

export default App;
