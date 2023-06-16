import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from "react-redux"
import { getAllTests } from '../../redux/actions/adminActions'
import { doctorGetAllTests } from '../../redux/actions/doctorActions'
const AddTest = () => {
    const [data, setdata] = useState([{
        name: ""
    }])
    const [userData, setuserData] = useState({
        test: []
    })

    const CONTENT = <table class="table table-dark table-striped table-hover mt-3">
        <thead>
            <tr>
                <th>#</th>
                <th>name</th>
                <th>email</th>
                <th>priority</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>

            {
                data && data.map((item, i) =>

                    <tr key={item._id}>
                        <td>{i + 1}</td>
                        <td>{item.task}</td>
                        <td>{item.desc}</td>
                        <td>{item.priority}</td>
                        {/* <td>{item.action}</td> */}
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
    const dispatch = useDispatch()
    const { allTests } = useSelector(state => state.doctor)
    useEffect(() => {
        dispatch(doctorGetAllTests())

    }, [])

    const handleChange = e => {
        if (e.target.checked) {
            // push
            setuserData({ ...userData, test: [...userData.test, e.target.value] })
        } else {
            const index = userData.test.findIndex(item => item === e.target.value)
            console.log(index);
            const copy = [...userData.test]
            copy.splice(index, 1)
            setuserData({ ...userData, test: copy })
        }
        // console.log(e.target.value)
    }


    return <>
        <div className="my-3 container">
            <div className="text-end">
                <button data-bs-toggle="modal" data-bs-target="#addModal" type="button" className="btn btn-primary">Add</button>
            </div>
            {CONTENT}

            {/* Add Start Modal  */}
            <div class="modal fade" id="addModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <pre>{JSON.stringify(userData, null, 2)}</pre>

                            <select
                                class="form-select"
                                value={userData.test}
                                onChange={e => setuserData({ ...userData, test: e.target.value })}
                            >
                                <option value="">Choose Test</option>
                                {
                                    allTests && allTests.map(item => <option value={item.name}>
                                        {item.name}
                                    </option>)
                                }
                            </select>
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


                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
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