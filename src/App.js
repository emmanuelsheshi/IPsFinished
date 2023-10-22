import logo from './logo.svg'
import './App.css'
import MenuBarComponent from './components/MenuBar'
import HeaderComponent from './components/Header'

import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

import DashBoardPage from './pages/Dashboard'
import AllStaffComponent from './pages/AllStaff'
import AddEmployeeComponent from './pages/AddEmployee'
import UpdateEmployeeComponent from './pages/UpdateEmployee'
import DeleteEmployeeComponent from './pages/DeleteEmployee'
import ExportPayRollComponent from './pages/ExportPayRollComponent'
import SearchResultsComponent from './pages/SearchResultComponent.js'
import ShowDeptComponent from './pages/ShowDeptComponent.js'
import SectionResultComponent from './pages/ShowDepartmentSection.js'
import LoginComponent from './pages/LoginComponent.js'

import { PaySlipComponent } from './pages/PaySlipComponent.js'

import { useAuth } from './context/AuthContext'
import { useActive } from './context/ActiveContext'

function App() {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth()
  const { active, setActive } = useActive()

  useEffect(() => {
    document.title = 'Imperium Payroll System'
  }, [])

  return (
    <>
      <div className="App">
        <div className="header_class">
          <HeaderComponent />
        </div>

        <div className="separate">
          <MenuBarComponent />

          <Routes>
            <Route path="*" element={<LoginComponent />} /> // defualt route
            {authUser.user === 'user' ? (
              <Route path="/login" element={<LoginComponent />} />
            ) : (
              <Route path="/" element={<DashBoardPage />} />
            )}
            {authUser.user === 'user' ? (
              <Route path="/login" element={<LoginComponent />} />
            ) : (
              <Route path="/employees" element={<AllStaffComponent />} />
            )}
            {authUser.user === 'user' ? (
              <Route path="/login" element={<LoginComponent />} />
            ) : (
              <Route
                path="/create_employee"
                element={<AddEmployeeComponent />}
              />
            )}
            {authUser.user === 'user' ? (
              <Route path="/login" element={<LoginComponent />} />
            ) : (
              <Route path="/update" element={<UpdateEmployeeComponent />} />
            )}
            {authUser.user === 'user' ? (
              <Route path="/login" element={<LoginComponent />} />
            ) : (
              <Route path="/" element={<DashBoardPage />} />
            )}
            {authUser.user === 'user' ? (
              <Route path="/login" element={<LoginComponent />} />
            ) : (
              <Route path="/export" element={<ExportPayRollComponent />} />
            )}
            {authUser.user === 'user' ? (
              <Route path="/login" element={<LoginComponent />} />
            ) : (
              <Route path="/search" element={<SearchResultsComponent />} />
            )}
            <Route path="/payslip" element={<PaySlipComponent />} />
            <Route path="/delete" element={<DeleteEmployeeComponent />} />
            <Route path="/show_department" element={<ShowDeptComponent />} />
            <Route path="/show_section" element={<SectionResultComponent />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
