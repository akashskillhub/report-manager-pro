import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminGetAllOrders } from '../../redux/actions/adminActions'

const Orders = () => {
    const dispatch = useDispatch()
    const { orders } = useSelector(state => state.admin)
    useEffect(() => {
        dispatch(adminGetAllOrders())
    }, [])

    const TABLE = orders && <div className='table-responsive'>
        <table class="table table-dark table-striped table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Dr. Name</th>
                    <th>Patient Name</th>
                    <th>Gender</th>
                    <th>DOB</th>
                    <th>Mobile</th>
                    <th>Docs</th>
                    <th>Test</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    orders.map((item, i) => <tr>
                        <td>{i + 1}</td>
                        <td>{item.doctorId.name}</td>
                        <td>{item.name}</td>
                        <td>{item.gender}</td>
                        <td>{item.dob}</td>
                        <td>{item.mobile}</td>
                        <td>
                            {item.docs.map(docURL => <span>{docURL}</span>)}
                            {/* {item.docs.map(docURL => <img
                                src={docURL}
                                height={100}
                                alt={docURL} />)} */}
                        </td>
                        <td>{JSON.stringify(item.test)}</td>
                        <td>
                            <button type="button" class="btn btn-warning me-2">Edit</button>
                            <button type="button" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>)
                }

            </tbody>
        </table>
    </div>
    return TABLE
}

export default Orders