import logo from './logo.svg'
import './App.css'
import MenuBarComponent from './components/MenuBar'
import HeaderComponent from './components/Header'

import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

import LoginPage from './pages/login'
import DashBoardPage from './pages/Dashboard'
import AllStaffComponent from './pages/AllStaff'
import AddEmployeeComponent from './pages/AddEmployee'
import UpdateEmployeeComponent from './pages/UpdateEmployee'
import DeleteEmployeeComponent from './pages/DeleteEmployee'
import ExportPayRollComponent from './pages/ExportPayRollComponent'
import SearchResultsComponent from './pages/SearchResultComponent.js'
import ShowDepartmentComponent from './pages/ShowDepartmentComponent.js'
import SectionResultComponent from './pages/ShowDepartmentSection.js'
import LoginComponent from './pages/LoginComponent.js'

function App() {
  const [login, setLoginState] = useState(0)

  return (
    <>
      <div className="App">
        <HeaderComponent />

        <div className="separate">
          <MenuBarComponent />

          <Routes>
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/" element={<DashBoardPage />} />
            <Route path="/employees" element={<AllStaffComponent />} />
            <Route path="/create_employee" element={<AddEmployeeComponent />} />
            <Route path="/update" element={<UpdateEmployeeComponent />} />
            <Route path="/delete" element={<DeleteEmployeeComponent />} />
            <Route path="/export" element={<ExportPayRollComponent />} />
            <Route path="/search" element={<SearchResultsComponent />} />

            <Route
              path="/show_department"
              element={<ShowDepartmentComponent />}
            />
            <Route path="show_section" element={<SectionResultComponent />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
