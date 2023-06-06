import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { AddDoctor, AddPathology, Dashboard, Layout, Settings } from './admin'
import { Home, PublicLayout } from './public'
import { Login, Register } from './share'
import { Addtest, DoctorDashboard, DoctorLayout, DoctorSettings } from './doctor'
import { PathologyDashboard, PathologyLayout, PathologySettings, SubmitReports } from './pathology'

const App = () => {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path='/admin' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-doctor" element={<AddDoctor />} />
          <Route path="add-pathology" element={<AddPathology />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index element={<DoctorDashboard />} />
          <Route path='add-test' element={<Addtest />} />
          <Route path='settings' element={<DoctorSettings />} />
        </Route>
        <Route path="/pathology" element={<PathologyLayout />}>
          <Route index element={<PathologyDashboard />} />
          <Route path='submit-report' element={<SubmitReports />} />
          <Route path='settings' element={<PathologySettings />} />
        </Route>

        <Route path='*' element={<>
          <h1> Page Not Found</h1>
          <Link to="/" className='btn btn-outline-light text-dark'>Back</Link>
        </>} />

      </Routes>
    </BrowserRouter>
  </>
}

export default App