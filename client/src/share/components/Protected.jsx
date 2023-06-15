import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const DoctorProtected = ({ compo }) => {
    const { login } = useSelector(state => state.public)
    useEffect(() => {
        if (!(login && login.account === "doctor")) {
            toast.error("Unauthorized Access")
        }
    }, [])
    return (login && login.account === "doctor") ? compo : <Navigate to="/login" />
}

export const PathologyProtected = ({ compo }) => {
    const { login } = useSelector(state => state.public)
    return (login && login.account === "pathology") ? compo : <h1>Uauthorized Access</h1>
}
export const AdminProtected = ({ compo }) => {
    const { login } = useSelector(state => state.public)
    return (login && login.account === "admin") ? compo : <h1>Uauthorized Access</h1>
}

