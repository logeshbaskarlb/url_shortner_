import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from "./Component/Pages/Login"
import Register from "./Component/Pages/Register"
import ForgetPassword from "./Component/Pages/ForgetPassword"
import ResetPassword from "./Component/Pages/ResetPassword"
import { ToastContainer } from 'react-toastify';
import Dashboard from './Component/Dashboard/Dashboard';

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/forget-password' element={<ForgetPassword />}></Route>
          <Route path='/reset-password/:token' element={<ResetPassword />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
        </Routes>
    </BrowserRouter>
    <ToastContainer />
    </>
  );
}

export default App;

// validate: (values) => {
//   let errors = {};
//   if (!values.originalUrl) {
//     errors.originalUrl = "Required";
//   }
//   return errors;
// },