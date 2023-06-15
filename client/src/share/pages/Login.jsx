import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import * as yup from 'yup'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { continueWithGoogle, loginUser } from '../../redux/actions/publicActions'
import { toast } from 'react-toastify'
import { invalidate } from '../../redux/slices/publicSlice'

import { GoogleLogin } from "react-google-login"
import { gapi } from "gapi-script"

const Login = () => {
    const dispatch = useDispatch()
    const { loading, error, login } = useSelector(state => state.public)
    const formik = useFormik({
        initialValues: ({
            email: "john@gmail.com",
            password: "123",
            account: "doctor"
        }),
        validationSchema: yup.object({
            email: yup.string().required().email(),
            password: yup.string().required(),
            account: yup.string().required(),
        }),
        onSubmit: (value, restForm) => {
            // restForm(),
            dispatch(loginUser(value))
        }
    })

    useEffect(() => {
        if (login) {
            toast.success("Login Success")
            // dispatch(invalidate(["login"]))
        }
        if (error) {
            toast.error(error)
            dispatch(invalidate(["error"]))
        }
    }, [login, error])

    useEffect(() => {
        gapi.load("client:auth2", () => {
            gapi.client.init({
                clientId: "779552957341-u3n05o5dgmbgvduui9igdiiuce036fgm.apps.googleusercontent.com",
                scope: ""
            })
        })

    }, [])


    const handleSuccess = (data) => {
        console.log(data)
        dispatch(continueWithGoogle({ ...data, account: formik.values.account }))
    }
    const handleFailure = err => {
        console.log(err)
    }
    const navigate = useNavigate()
    useEffect(() => {
        if (login) {
            login.account === "doctor"
                ? navigate("/doctor")
                : navigate("/pathology")
        }
    }, [login])

    if (loading) return <div class="spinner-border text-primary"></div>

    return <>
        <div className="container my-3">
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <div className="card">
                        <div className="card-header fw-bold fs-3 text-bg-danger text-center">Login</div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="card-body">
                                <GoogleLogin
                                    buttonText={`Continue With Google as ${formik.values.account}`}
                                    clientId='779552957341-u3n05o5dgmbgvduui9igdiiuce036fgm.apps.googleusercontent.com'
                                    className='w-100 bg-primary text-light  my-4'
                                    onSuccess={handleSuccess}
                                    onFailure={handleFailure}
                                />
                                <hr />
                                <div>
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="text"
                                        {...formik.getFieldProps("email")}
                                        className={`form-control ${formik.touched.email && (formik.errors.email ? "is-invalid" : "is-valid")}`}
                                        id="email"
                                        placeholder="Enter Your Email"
                                    />
                                    <div className="valid-feedback">Looks good!</div>
                                    <div className="invalid-feedback">Please Enter a Valid Email.</div>
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        {...formik.getFieldProps("password")}
                                        className={`form-control ${formik.touched.password && (formik.errors.password ? "is-invalid" : "is-valid")}`}
                                        id="password"
                                        placeholder="Enter Your Password"
                                    />
                                    <div className="valid-feedback">Looks good!</div>
                                    <div className="invalid-feedback">Please choose a username.</div>
                                </div>
                                <div className='mt-3'>
                                    <p className='d-inline me-4 fw-bold'>Login As</p>
                                    <div className="form-check-inline">
                                        <input
                                            {...formik.getFieldProps("account")}
                                            className="form-check-input"
                                            type="radio"
                                            name="account"
                                            checked={formik.values.account === "doctor"}
                                            value="doctor"
                                            id="doctor" />
                                        <label className="form-check-label mx-2" htmlFor="doctor">
                                            Doctor
                                        </label>
                                    </div>
                                    <div className="form-check-inline">
                                        <input
                                            {...formik.getFieldProps("account")}
                                            className="form-check-input"
                                            type="radio"
                                            name="account"
                                            checked={formik.values.account !== "doctor"}
                                            value="pathology"
                                            id="pathology" />
                                        <label className="form-check-label mx-2" htmlFor="pathology">
                                            Pathology
                                        </label>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-danger w-100 mt-3">
                                    Login
                                </button>
                                <p className="text-center mt-3">
                                    Dont Have Account? <Link to="/register" className='text-danger'>Create Account</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Login