import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateDoctorProfile } from '../../redux/actions/doctorActions'

const RequiredForm = () => {
    const dispatch = useDispatch()
    const [doctorData, setDoctorData] = useState({
        hospitalName: "clinic 1",
        address: "fake address",
        mobile: 4444444444,
        gender: "male"

    })
    const handleUpdateProfile = () => {
        dispatch(updateDoctorProfile(doctorData))
    }
    return <>
        <div className="container">
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <div class="card">
                        <div class="card-header">Update Profile</div>
                        <div class="card-body">
                            <input
                                type="text"
                                className='form-control'
                                placeholder='Enter Hospital / Clinic name' /> <br />
                            <input
                                type="text"
                                className='form-control'
                                placeholder='Enter Mobile Number' /> <br />
                            <input
                                type="text"
                                className='form-control'
                                placeholder='Enter Main Address' /> <br />
                            <div>
                                <div className="form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        id="male" />
                                    <label className="form-check-label" htmlFor="male">
                                        Male
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        id="female" />
                                    <label
                                        className="form-check-label" htmlFor="female">
                                        Female
                                    </label>
                                </div>
                            </div>
                            <button
                                onClick={handleUpdateProfile}
                                type="button"
                                className="btn btn-primary w-100 my-3">Update Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default RequiredForm