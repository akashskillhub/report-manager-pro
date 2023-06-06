import React, { useState } from 'react'

const AddTest = () => {
    const [data, setdata] = useState([{
        name: ""
    }])
    // const [testdata, settestdata] = useState([])

    // console.log(testData);

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
                            ...
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