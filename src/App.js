import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./App.css";

import Welcome from "./Pages/Welcome";
// import Registration from "./Pages/Registration";
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from "./Pages/ResetPassword";
import Dashboard from "./Pages/Dashboard";
import LeadAdd from "./Pages/LeadAdd";
import LeadTable from "./Pages/LeadTable";
import LeadEdit from "./Pages/LeadEdit";
import LeadStage from "./Pages/LeadStage";
import StageEdit from "./Pages/StageEdit";
import LeadInformation from "./Pages/LeadInformation";
import InformationEdit from "./Pages/InformationEdit";
import TermCondition from "./Pages/TermCondition";

export default function App() {
  // Authentication
  const PrivateRoute = () => {
    const user_email = localStorage.getItem("user_email")
    return user_email ? <Outlet /> : <Navigate to="/" />
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        {/* <Route path="/register" element={<Registration />} /> */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        <Route path="/reset-password/:email" element={< ResetPassword />} />



        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route exact path="/lead-add" element={<PrivateRoute />}>
          <Route path="/lead-add" element={< LeadAdd />} /></Route>

        <Route exact path="/lead-table" element={<PrivateRoute />}>
          <Route path="/lead-table" element={< LeadTable />} /></Route>

        <Route exact path="/lead-information" element={<PrivateRoute />}>
          <Route path="/lead-information" element={< LeadInformation />} /></Route>

        <Route exact path="/information-edit/:id" element={<PrivateRoute />}>
          <Route path="/information-edit/:id" element={< InformationEdit />} /></Route>

        <Route exact path="/lead-edit/:id" element={<PrivateRoute />}>
          <Route path="/lead-edit/:id" element={< LeadEdit />} /></Route>

        <Route exact path="/lead-stage" element={<PrivateRoute />}>
          <Route path="/lead-stage" element={< LeadStage />} /></Route>

        <Route exact path="/stage-edit/:id" element={<PrivateRoute />}>
          <Route path="/stage-edit/:id" element={< StageEdit />} /></Route>

        <Route path="/term-condition" element={<PrivateRoute />}>
          <Route path="/term-condition" element={<TermCondition />} />
        </Route>
      </Routes>

      <ToastContainer autoClose={2000} />
    </>
  )
}