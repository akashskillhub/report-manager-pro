import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminDeleteOrder, adminGetAllOrders, adminGetAllPathology, adminUpdateOrder, getAllTests } from '../../redux/actions/adminActions'
import { toast } from 'react-toastify'
import { adminReset } from '../../redux/slices/adminSlice'

const Orders = () => {
    const dispatch = useDispatch()
    const { orders, loading, error, orderDeleted, tests, orderUpdated, pathologies } = useSelector(state => state.admin)
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
        if (orderUpdated) {
            toast.warn("Order Updated Successfully")
            dispatch(adminReset(["orderUpdated"]))
            dispatch(adminGetAllOrders())
        }
    }, [error, orderDeleted, orderUpdated])
    useEffect(() => {
        dispatch(adminGetAllOrders())
        dispatch(getAllTests())
        dispatch(adminGetAllPathology())
    }, [])
    const [selctedOrder, setSelctedOrder] = useState()
    const [selectedPathology, setSelectedPathology] = useState()

    const handleChange = e => {
        if (e.target.checked) {
            // push
            const selctedTest = tests.find(item => item.name === e.target.value)
            console.log(selctedTest)
            setSelctedOrder({
                ...selctedOrder,
                test: [
                    ...selctedOrder.test,
                    {
                        testId: selctedTest._id,
                        price: selctedTest.doctorPrice
                    }]
            })
        } else {
            const index = selctedOrder.test.findIndex(item => item === e.target.value)
            console.log(index);
            const copy = [...selctedOrder.test]
            copy.splice(index, 1)
            setSelctedOrder({ ...selctedOrder, test: copy })
        }
    }

    const handleImage = e => {
        console.log(e.target.files);
        const imgURL = []
        for (let i = 0; i < e.target.files.length; i++) {
            imgURL.push(URL.createObjectURL(e.target.files[i]))
        }
        setSelctedOrder({
            ...selctedOrder,
            preview: imgURL,
            newDocs: e.target.files
        })
    }

    const handleUpdateOrder = () => {
        const fd = new FormData()
        fd.append("name", selctedOrder.name)
        fd.append("dob", selctedOrder.dob)
        fd.append("gender", selctedOrder.gender)
        fd.append("mobile", selctedOrder.mobile)
        fd.append("test", JSON.stringify(selctedOrder.test))
        fd.append("docs", JSON.stringify(selctedOrder.docs))
        if (selctedOrder.newDocs) {
            for (let i = 0; i < selctedOrder.newDocs.length; i++) {
                fd.append("newDocs", selctedOrder.newDocs[i])
            }
        }

        dispatch(adminUpdateOrder({ fd, id: selctedOrder._id }))
    }
    const TABLE = orders && <div className='table-responsive'>
        <table class="table table-dark table-striped table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Stauts</th>
                    <th>Dr. Name</th>
                    <th>Pathology</th>
                    <th>Patient Name</th>
                    <th>Gender</th>
                    <th>DOB</th>
                    <th>Mobile</th>
                    <th>Docs</th>
                    <th>Test</th>
                    <th>Reports</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    orders.map((item, i) => <tr className={item.pathology ? 'table-info' : 'table-danger'}>
                        <td>{i + 1}</td>
                        <td>{item.status}</td>
                        <td>{item.doctorId.name}</td>
                        <td>
                            {
                                item.pathology
                                    ? <p>{item.pathology.name} </p>
                                    : <>
                                        {pathologies && <select
                                            onChange={e => setSelectedPathology(e.target.value)}
                                            class="form-select">
                                            <option >Choose Pathology</option>
                                            {
                                                pathologies.map(item => <option
                                                    value={item._id}>
                                                    {item.name}
                                                </option>)
                                            }
                                        </select>}
                                        <button
                                            onClick={e => dispatch(adminUpdateOrder({
                                                ...item,
                                                id: item._id,
                                                pathology: selectedPathology,
                                                action: "assign"
                                            }))}
                                            type="button"
                                            class="btn btn-primary my-2">Assign</button>
                                    </>
                            }
                        </td>
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
                            {item.reports.map(i => <div>
                                <img src={i} alt="" height={50} />
                            </div>)}
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

        <div class="modal fade" id="deleteModal">
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

                        <hr />
                        <input multiple type="file" onChange={handleImage} />
                        <br />
                        {
                            selctedOrder && selctedOrder.preview && selctedOrder.preview.map(item => <img src={item} height={100} alt="" />)
                        }

                        <hr />

                        {
                            (selctedOrder && tests) && tests.map(item => <div>
                                <input
                                    type="checkbox"
                                    onChange={handleChange}
                                    value={item.name}
                                    checked={selctedOrder.test.find(t => item.name === t.testId.name)}
                                    id={item.name} />
                                <label htmlFor={item.name} className='mx-2'>{item.name}</label>
                            </div>)
                        }
                        <div className='my-2'>
                            <input
                                checked={selctedOrder && selctedOrder.gender === "male"}
                                type="radio"
                                id='male'
                                name='gender'
                                value='male'
                                onChange={e => setSelctedOrder({ ...selctedOrder, gender: e.target.value })}
                            />
                            <label htmlFor="male">male</label>
                            <input
                                checked={selctedOrder && selctedOrder.gender === "female"}
                                type="radio"
                                id='female'
                                name='gender'
                                value='female'
                                onChange={e => setSelctedOrder({ ...selctedOrder, gender: e.target.value })}
                            />
                            <label htmlFor="female">female</label>
                        </div>

                    </div>

                    <div>

                    </div>

                    <pre>
                        {JSON.stringify(selctedOrder, null, 2)}
                    </pre>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button
                            data-bs-dismiss="modal"
                            onClick={handleUpdateOrder}
                            type="button"
                            class="btn btn-primary">Update changes</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Orders