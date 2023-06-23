import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminDeleteOrder, adminGetAllOrders } from '../../redux/actions/adminActions'
import { toast } from 'react-toastify'
import { adminReset } from '../../redux/slices/adminSlice'

const Orders = () => {
    const dispatch = useDispatch()
    const { orders, loading, error, orderDeleted } = useSelector(state => state.admin)
    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(adminReset(["error"]))
        }
        if (orderDeleted) {
            toast.success("Order Deleted Successfully")
            dispatch(adminReset(["orderDeleted"]))
            dispatch(adminGetAllOrders())
        }
    }, [error, orderDeleted])
    useEffect(() => {
        dispatch(adminGetAllOrders())
    }, [])
    const [selctedOrder, setSelctedOrder] = useState()

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
                            {/* {item.docs.map(docURL => <span>{docURL}</span>)} */}
                            {item.docs.map(docURL => <img
                                src={docURL}
                                height={100}
                                alt={docURL} />)}
                        </td>
                        {/* <td>{JSON.stringify(item.test)}</td> */}
                        <td>
                            <ol>
                                {
                                    item.test.map(t => <li>
                                        {t.testId.name}
                                    </li>)
                                }
                            </ol>
                        </td>
                        <td>
                            <button
                                data-bs-toggle="modal"
                                data-bs-target="#editModal"
                                onClick={e => setSelctedOrder(item)}
                                type="button"
                                class="btn btn-warning me-2">Edit</button>
                            <button
                                data-bs-toggle="modal"
                                data-bs-target="#deleteModal"
                                type="button"
                                onClick={e => setSelctedOrder(item)}
                                class="btn btn-danger">Delete</button>
                        </td>
                    </tr>)
                }

            </tbody>
        </table>
    </div>

    if (loading) return <div class="spinner-border text-primary"></div>
    return <>
        {TABLE}

        {/* delete modal  */}

        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <pre>
                            {JSON.stringify(selctedOrder, null, 2)}
                        </pre>
                        <h1>Are you sure , you want to delete this order?</h1>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No and Close</button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={e => dispatch(adminDeleteOrder(selctedOrder))}
                        >Yes</button>
                    </div>
                </div>
            </div>
        </div>

        {/* edit modal */}



        <div class="modal fade" id="editModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <input
                            type="text"
                            onChange={e => setSelctedOrder({
                                ...selctedOrder, name: e.target.value
                            })}
                            value={selctedOrder && selctedOrder.name} />
                        <br />
                        {
                            selctedOrder && selctedOrder.docs.map((item, i) => <div>
                                <button
                                    onClick={e => {
                                        const copy = [...selctedOrder.docs]
                                        copy.splice(i, 1)
                                        setSelctedOrder({ ...selctedOrder, docs: copy })
                                    }}
                                >remove</button>
                                <img src={item} height={50} alt="" />
                            </div>)
                        }
                    </div>

                    <pre>
                        {JSON.stringify(selctedOrder, null, 2)}
                    </pre>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Update changes</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Orders