import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router'

import Login from './pages/user/Login'
import Registration from './pages/user/Registration'
import Dashboard from './pages/admin/Dashboard'
import Session from './pages/admin/Session'
import Subject from './pages/admin/Subject'
import Examinee from './pages/admin/Examinee'
import AdminLogin from './pages/admin/AdminLogin'
import UserDashboard from './pages/user/UserDashboard'
import Questionbank from './pages/admin/Questionbank'
import Examination from './pages/admin/Examination'
import Profile from './pages/user/Profile'
import MyExams from './pages/user/MyExams'
import GetExam from './pages/user/GetExam'
import ChangePassword from './pages/user/ChangePassword'
import Password from './pages/admin/Password'
import ContactUs from './pages/admin/ContactUs'
import Contact from './pages/user/Contact'
import Report from './pages/admin/Report'
import ExamResultsDeclaration from './pages/admin/ExamResultsDeclaration'
import Result from './pages/user/Result'
import Adhome from './pages/admin/Adhome'


function App() {
  

  return (
    <Router>
      <Routes>
        {/* {registration route} */}
        <Route path='/' element={<Login/>}></Route>
        <Route path='/registration' element={<Registration/>}></Route>
        {/* {admin route} */}
        <Route path='/adlogin' element={<AdminLogin/>}></Route>
        <Route path='/admin/' element={<Dashboard/>}>
           <Route index element={<Adhome/>}></Route>       
           <Route path='session' element={<Session/>}></Route>       
           <Route path='subject' element={<Subject/>}></Route>       
           <Route path='examinee' element={<Examinee/>}></Route> 
           <Route path='questionbank' element={<Questionbank/>}></Route>      
           <Route path='examination' element={<Examination/>}></Route>      
           <Route path='password' element={<Password/>}></Route>   
           <Route path='contact' element={<ContactUs/>}></Route>   
           <Route path='report' element={<Report/>}></Route>   
           <Route path='resultdec' element={<ExamResultsDeclaration/>}></Route>              
        </Route>
        <Route path='/user/' element={<UserDashboard/>}>
           <Route path='profile' element={<Profile/>}></Route>
           <Route path='myexam' element={<MyExams/>}></Route>         
           <Route path='pass' element={<ChangePassword/>}></Route>         
           <Route path='getexam/:id' element={<GetExam/>}></Route>  
           <Route path='contactus' element={<Contact/>}></Route>  
           <Route path='result' element={<Result/>}></Route>  
        </Route>
        
      </Routes>
    </Router>
    
     
  )
}

export default App
