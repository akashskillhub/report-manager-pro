import { useFormik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import { Link } from "react-router-dom"

const Login = () => {
    const formik = useFormik({
        initialValues: ({
            email: "",
            password: "",
            account: "doctor"
        }),
        validationSchema: yup.object({
            email: yup.string().required().email(),
            password: yup.string().required(),
            account: yup.string().required(),
        }),
        onSubmit: (value, restForm) => {
            // restForm(),
            console.log(value);
        }
    })

    return <>
        <div className="container my-3">
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <div className="card">
                        <div className="card-header fw-bold fs-3 text-bg-danger text-center">Login</div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="card-body">
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