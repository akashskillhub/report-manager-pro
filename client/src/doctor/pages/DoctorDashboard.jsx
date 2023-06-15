import React from 'react'
import RequiredForm from '../components/RequiredForm'
import { useSelector } from 'react-redux'

const DoctorDashboard = () => {
  const { login } = useSelector(state => state.public)
  return <>
    {
      login && !login.mobile
        ? <RequiredForm />
        : <h1>DashBoard</h1>
    }

  </>

}

export default DoctorDashboard