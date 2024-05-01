import FormPage from "./Pages/FormPage";
import Emp_TC from "./components/Emp_TC";
import Emp_TC_OPT from "./components/Emp_TC_OPT";
import Emp_master from "./components/Emp_master";
import STUDENT_MASTER from "./components/STUDENT_MASTER";
import Login from "./components/login";
import HomePage from "./Pages/HomePage";
import ApplicationPage from "./Pages/ApplicationPage";
import StudentData from "./components/studentdata";
import RegisterPage from "./Pages/RegisterPage"
import FeeRegister from "./components/FeeRegister";
import { BrowserRouter as Router, Route, Routes, Form } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="forms" element={<FormPage/>}/>
      <Route path="Emp_TC" element={<Emp_TC/>}/>
      <Route path="Emp_TC_OPT" element={<Emp_TC_OPT/>}/>
      <Route path="Emp_master" element={<Emp_master/>}/>
      <Route path="STUDENT_MASTER" element={<STUDENT_MASTER/>}/>
      <Route path="homepage" element={<HomePage/>}/>
      <Route path="applications" element={<ApplicationPage/>}/>
      <Route path="register" element={<RegisterPage/>}/>
      <Route path="/student-data/:applicationId" element={<StudentData/>}/>
      <Route path="/fee-register/:applicationId" element={<FeeRegister/>}/>

      </Routes> 
      </Router>
    </div>
  );
}

export default App;
