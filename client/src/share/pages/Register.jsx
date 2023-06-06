import React, { useState } from 'react'
import { useFormik } from "formik"
import *as yup from 'yup'

const Register = () => {
    const [showForm, setShowForm] = useState(true)
    return <>
        <div className="d-flex justify-content-center gap-5">
            <h1 onClick={e => setShowForm(true)}>Doctor</h1>
            <h1 onClick={e => setShowForm(false)}>Pathology</h1>
        </div>
        {
            showForm
                ? <RegisterDoctor />
                : <RegisterPathology />
        }
    </>
}
const RegisterDoctor = () => {
    const formik = useFormik({
        initialValues: ({
            name: "",
            cilinic_name: "",
            mobile: "",
            email: "",
            password: "",
            c_password: ""
        }),
        validationSchema: yup.object({
            name: yup.string().required().min(2).max(16),
            cilinic_name: yup.string().required().min(2).max(16),
            mobile: yup.string().required().min(10),
            email: yup.string().required().email(),
            password: yup.string().required().min(6).max(16),
            c_password: yup.string().required().oneOf([yup.ref("password")])

        }),
        onSubmit: (value, restForm) => {
            console.log(value);
        }
    })

    return <>
        <div class="container mt-5">
            <div class="row">
                <div class="col-sm-6 offset-sm-3">
                    <form onSubmit={formik.handleSubmit}>
                        <div class="card">
                            <div class="card-header">Register</div>
                            <div class="card-body">
                                <div>
                                    <label for="name" class="form-label"> Name</label>
                                    <input
                                        {...formik.getFieldProps("name")}
                                        type="text"
                                        class={`form-control ${formik.touched.name && (formik.errors.name ? "is-invalid" : "is-valid")}`}
                                        id="name"
                                        placeholder="Enter your name"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.name}</div>
                                </div>
                                <div class="mt-2">
                                    <label for="clinic" class="form-label">Clinic name</label>
                                    <input
                                        {...formik.getFieldProps("cilinic_name")}
                                        type="text"
                                        class={`form-control ${formik.touched.cilinic_name && (formik.errors.cilinic_name ? "is-invalid" : "is-valid")}`}
                                        id="clinic"
                                        placeholder="Enter Your Clinic name"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.cilinic_name}.</div>
                                </div>
                                <div class="mt-2">
                                    <label for="mobile" class="form-label">Mobile no.</label>
                                    <input
                                        {...formik.getFieldProps("mobile")}
                                        type="text"
                                        class={`form-control ${formik.touched.mobile && (formik.errors.mobile ? "is-invalid" : "is-valid")}`}
                                        id="mobile"
                                        placeholder="Enter Your mobile number"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.mobile}</div>
                                </div>
                                <div class="mt-2">
                                    <label for="email" class="form-label">Email</label>
                                    <input
                                        {...formik.getFieldProps("email")}
                                        type="email"
                                        class={`form-control ${formik.touched.email && (formik.errors.email ? "is-invalid" : "is-valid")}`}
                                        id="email"
                                        placeholder="Enter Your email "
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.email}</div>
                                </div>
                                <div class="mt-2">
                                    <label for="password" class="form-label">Password</label>
                                    <input
                                        {...formik.getFieldProps("password")}
                                        type="text"
                                        class={`form-control ${formik.touched.password && (formik.errors.password ? "is-invalid" : "is-valid")}`}
                                        id="password"
                                        placeholder="Enter Your Password"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.password}</div>
                                </div>
                                <div class="mt-2">
                                    <label for="cpassword" class="form-label"
                                    >Confirm Password</label
                                    >
                                    <input
                                        {...formik.getFieldProps("c_password")}
                                        type="text"
                                        class={`form-control ${formik.touched.c_password && (formik.errors.c_password ? "is-invalid" : "is-valid")}`}
                                        id="cpassword"
                                        placeholder="Confirm Your Password"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">
                                        {formik.errors.c_password}
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary w-100 mt-3">
                                    Signup
                                </button>
                                <p class="text-center mt-3">
                                    Already Have Account? <a href="#">Login</a>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}
const RegisterPathology = () => {
    return <>
        <div class="container">
            <div class="row">
                <div class="col-sm-6 offset-sm-3">
                    <div class="card">
                        <div class="card-header">Pathology Registration</div>
                        <div class="card-body">
                            <div>
                                <label for="name" class="form-label">First name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="name"
                                    placeholder="Enter your name"
                                />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a username.</div>
                            </div>
                            <div class="mt-2">
                                <label for="email" class="form-label">First Email</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="email"
                                    placeholder="Enter Your Email"
                                />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a username.</div>
                            </div>
                            <div class="mt-2">
                                <label for="password" class="form-label">Password</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="password"
                                    placeholder="Enter Your Password"
                                />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a password.</div>
                            </div>
                            <div class="mt-2">
                                <label for="cpassword" class="form-label"
                                >Confirm Password</label
                                >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="cpassword"
                                    placeholder="Confirm Your Password"
                                />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">
                                    Please Recheck Your Password.
                                </div>
                            </div>
                            <button type="button" class="btn btn-primary w-100 mt-3">
                                Signup
                            </button>
                            <p class="text-center mt-3">
                                Already Have Account? <a href="#">Login</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Register