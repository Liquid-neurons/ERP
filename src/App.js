import FormPage from "./Pages/FormPage";
import Emp_TC from "./components/Emp_TC";
import Emp_TC_OPT from "./components/Emp_TC_OPT";
import Emp_master from "./components/Emp_master";
import StudentApplicationPage from "./Pages/studentApplicationPage";
import Login from "./components/login";
import HomePage from "./Pages/HomePage";
import ApplicationPage from "./Pages/ApplicationPage";
import StudentData from "./components/studentdata";
import RegisterPage from "./Pages/RegisterPage"
import FeeRegisterationPage from "./Pages/FeeRegistrationPage";
import SiblingRegisterationPage from "./Pages/SiblingRegistrationPage";
import ViewApplication from "./components/viewapplication";
import StudentRegisterationPage from "./Pages/StudentRegisterPage";
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
      <Route path="STUDENT_MASTER" element={<StudentApplicationPage/>}/>
      <Route path="homepage" element={<HomePage/>}/>
      <Route path="applications" element={<ApplicationPage/>}/>
      <Route path="register" element={<RegisterPage/>}/>
      <Route path="/student-data/:applicationId" element={<StudentData/>}/>
      <Route path="/view-application/:applicationId" element={<ViewApplication/>}/>
      <Route path="/fee-register/:applicationId" element={<FeeRegisterationPage/>}/>
      <Route path="/sibling-register/:applicationId" element={<SiblingRegisterationPage/>}/>
      <Route path="/student-register/:applicationId" element={<StudentRegisterationPage/>}/>

      </Routes> 
      </Router>
    </div>
  );
}

export default App;
