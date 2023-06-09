import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from "react-redux"
import { getAllTests } from '../../redux/actions/adminActions'
import { doctorAddTest, doctorGetAllTests, getDoctorOrders } from '../../redux/actions/doctorActions'
import { toast } from 'react-toastify'
import { invalidate } from '../../redux/slices/doctorSlice'
const AddTest = () => {


    const [userData, setuserData] = useState({
        test: [],
        name: "john",
        gender: "male",
        mobile: "8899889988",
        dob: "",
        docs: [],
        preview: []
    })
    const dispatch = useDispatch()
    const { allTests, loading, error, addTest, orders } = useSelector(state => state.doctor)
    useEffect(() => {
        dispatch(doctorGetAllTests())
        dispatch(getDoctorOrders())
    }, [])
    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(invalidate(["error"]))
        }
        if (addTest) {
            toast.success("Test added successfully")
            dispatch(invalidate(["addTest"]))
        }

    }, [addTest, error])

    const handleChange = e => {
        if (e.target.checked) {
            // push
            const selctedTest = allTests.find(item => item.name === e.target.value)
            console.log(selctedTest)
            // setuserData({ ...userData, test: [...userData.test, e.target.value] })
            setuserData({
                ...userData,
                test: [
                    ...userData.test,
                    {
                        testId: selctedTest._id,
                        price: selctedTest.doctorPrice
                    }]
            })
        } else {
            const index = userData.test.findIndex(item => item === e.target.value)
            console.log(index);
            const copy = [...userData.test]
            copy.splice(index, 1)
            setuserData({ ...userData, test: copy })
        }
    }

    const handleImage = e => {
        const imageArray = []
        for (let i = 0; i < e.target.files.length; i++) {
            const imageURL = URL.createObjectURL(e.target.files[i])
            imageArray.push(imageURL)
        }
        setuserData({ ...userData, preview: imageArray, docs: e.target.files })

    }

    const handleAddTest = () => {
        const fd = new FormData()
        fd.append("name", userData.name)
        fd.append("dob", userData.dob)
        fd.append("gender", userData.gender)
        fd.append("mobile", userData.mobile)
        fd.append("test", JSON.stringify(userData.test))
        for (let i = 0; i < userData.docs.length; i++) {
            fd.append("docs", userData.docs[i])
        }
        dispatch(doctorAddTest(fd))

    }

    const CONTENT = <table class="table table-dark table-striped table-hover mt-3">
        <thead>
            <tr>
                <th>#</th>
                <th>name</th>
                <th>gender</th>
                <th>dob</th>
                <th>test</th>
                <th>Reports</th>
                <th>docs</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>

            {
                orders && orders.map((item, i) =>

                    <tr key={item._id} className={item.reports.length > 0 && "table-success"}>
                        <td>{i + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.gender}</td>
                        <td>{item.dob}</td>
                        <td>{item.test.map(t => <li>{t.testId.name}</li>)}</td>
                        <td>{item.reports.map(r => <div>
                            <img src={r} height={50} alt="" />
                        </div>)}</td>
                        <td>{item.docs}</td>
                        <td>
                            <button data-bs-toggle="modal" data-bs-target="#editModal"
                                type="button" class="btn btn-warning me-2">Edit</button>
                            <button data-bs-toggle="modal" data-bs-target="#deleteModal"
                                type="button" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                )
            }
        </tbody>
    </table>


    return <>
        <div className="my-3 container">
            <div className="text-end">
                <button data-bs-toggle="modal" data-bs-target="#addModal" type="button" className="btn btn-primary">Add</button>
            </div>
            {CONTENT}

            {/* Add Start Modal  */}
            <div class="modal fade" id="addModal">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <pre>{JSON.stringify(userData, null, 2)}</pre>

                            <div className='d-flex gap-3'>
                                <input
                                    type="text"
                                    className='form-control'
                                    placeholder='enter name'
                                    value={userData.name}
                                    onChange={e => setuserData({ ...userData, name: e.target.value })}
                                />
                                <input
                                    type="date"
                                    className='form-control'
                                    placeholder='enter dob'
                                    value={userData.dob}
                                    onChange={e => setuserData({ ...userData, dob: e.target.value })}
                                />
                                <input
                                    type="text"
                                    className='form-control'
                                    placeholder='enter mobile'
                                    value={userData.mobile}
                                    onChange={e => setuserData({ ...userData, mobile: e.target.value })}
                                />

                            </div>
                            <div className='form-check-inline my-2'>
                                <input
                                    type="radio"
                                    className='form-check-input  mx-2 '
                                    value="male"
                                    id='male'
                                    onChange={e => setuserData({ ...userData, gender: e.target.value })}
                                    name='gender'
                                />
                                <label htmlFor="male" className='me-4'>Male</label>
                                <input
                                    type="radio"
                                    className='form-check-input mx-2 '
                                    value="female"
                                    id='female'
                                    onChange={e => setuserData({ ...userData, gender: e.target.value })}
                                    name='gender'
                                />
                                <label htmlFor="female">Female</label>
                            </div>

                            {
                                allTests && allTests.map(item => <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        onChange={handleChange}
                                        value={item.name}
                                        id={item.name} />
                                    <label class="form-check-label" htmlFor={item.name}>
                                        {item.name}
                                    </label>
                                </div>)
                            }

                            <input
                                type="file"
                                onChange={handleImage}
                                className='form-control my-3'
                                multiple />
                            {
                                userData.preview.length > 0 && <>
                                    <hr />
                                    {
                                        userData.preview.map(item => <img
                                            src={item}
                                            alt={item}
                                            height={50}
                                            key={item}
                                            className='mx-2' />)
                                    }
                                </>
                            }


                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button
                                data-bs-dismiss="modal"
                                onClick={handleAddTest}
                                type="button"
                                class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Add end Modal  */}
            {/* Edit Start modal  */}
            <div class="modal fade" id="editModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">



                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Edit end modal  */}

            {/* delete start modal */}

            <div class="modal fade" id="deleteModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* delete end modal */}
        </div>
    </>
}

export default AddTest