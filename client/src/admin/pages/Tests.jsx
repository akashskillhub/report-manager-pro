import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTest, getAllTests } from "../../redux/actions/adminActions";
import { toast } from "react-toastify";
import { adminReset } from "../../redux/slices/adminSlice";

const Test = () => {
    const [testData, setTestData] = useState({
        name: "blood test",
        mrp: 100,
        doctorPrice: 50,
        category: "general physician",
        validity: "",
        gender: "",
        height: "",
        weight: "",
        dob: "",
        docs: "",
    });


    const dispatch = useDispatch()
    const handleAddTest = () => {
        dispatch(addTest(testData))
    }
    const { loading, error, testCreate, testUpdate, testDelete, tests } = useSelector(state => state.admin)
    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(adminReset(["error"]))
        }
        if (testCreate) {
            toast.success("Test Created Successfully")
            dispatch(getAllTests())
            dispatch(adminReset(["testCreate"]))
        }
    }, [error, testCreate, testUpdate, testDelete])

    useEffect(() => {
        dispatch(getAllTests())
    }, [])

    const content = <>

        <table class="table table-dark table-striped table-hover">
            <thead>
                <tr>
                    <th >Name</th>
                    <th >MRP</th>
                    <th >Doctor Price</th>
                    <th >Category</th>
                    <th >Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    tests && tests.map(item => <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.mrp}</td>
                        <td>{item.doctorPrice}</td>
                        <td>{item.category}</td>
                        <td>
                            <button type="button" class="btn btn-warning mx-2">Edit</button>
                            <button type="button" class="btn btn-danger ">Delete</button>
                        </td>
                    </tr>)
                }

            </tbody>
        </table>
    </>

    if (loading) return <div class="spinner-border text-primary"></div>
    return (
        <>
            <div className="container ">
                <div className="text-end my-3">
                    <button
                        type="button"
                        className="btn btn-primary "
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                    >
                        Add Test
                    </button>
                </div>
                {content}
            </div>

            {/* test modal start */}

            <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog modal-dialog-scrollable modal-lg">
                    <div class="modal-content">
                        <div class="modal-header bg-warning">
                            {/* <pre>{JSON.stringify(testData, null, 2)}</pre> */}
                            <h5 class="modal-title" id="exampleModalLabel">
                                Test
                            </h5>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">
                            <div>
                                <label for="name" class="form-label">
                                    First name
                                </label>
                                <input
                                    name="name"
                                    type="text"
                                    onChange={(e) =>
                                        setTestData({ ...testData, name: e.target.value })
                                    }
                                    value={testData.name}
                                    class="form-control"
                                    id="name"
                                    placeholder="Enter Your Name"
                                />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a username.</div>
                            </div>
                            <div>
                                <label for="name" class="form-label">
                                    MRP ₹
                                </label>
                                <input
                                    name="mrp"
                                    onChange={(e) =>
                                        setTestData({ ...testData, mrp: e.target.value })
                                    }
                                    value={testData.mrp}
                                    type="number"
                                    class="form-control"
                                    id="mrp"
                                    placeholder="Enter Your MRP"
                                />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a username.</div>
                            </div>
                            <div>
                                <label for="name" class="form-label">
                                    Doctor Price
                                </label>
                                <input
                                    onChange={(e) =>
                                        setTestData({ ...testData, dprice: e.target.value })
                                    }
                                    value={testData.dprice}
                                    name="dprice"
                                    type="text"
                                    class="form-control"
                                    id="dprice"
                                    placeholder="Enter Doctor Price"
                                />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a username.</div>
                            </div>
                            <div>
                                Category
                                <select
                                    class="form-select mt-2"
                                    onChange={(e) =>
                                        setTestData({ ...testData, category: e.target.value })
                                    }
                                    value={testData.category}
                                    name="category"
                                >
                                    <option selected>Select Category</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>

                            <div>
                                <label for="name" class="form-label">
                                    validity
                                </label>
                                <input
                                    onChange={(e) =>
                                        setTestData({ ...testData, validity: e.target.value })
                                    }
                                    value={testData.validity}
                                    validity="validity"
                                    type="date"
                                    class="form-control"
                                    id="validity"
                                    placeholder="Enter Your validity"
                                />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a username.</div>
                            </div>

                            <div className="mt-2">
                                Gender
                                <div class="form-check-inline mx-3">
                                    <input
                                        onChange={(e) =>
                                            setTestData({ ...testData, gender: e.target.value })
                                        }
                                        value="male"
                                        class="form-check-input"
                                        type="radio"
                                        name="gender"
                                        id="male"
                                        checked={testData.gender === "male"}
                                    />
                                    <label class="form-check-label" for="male">
                                        Male
                                    </label>
                                </div>
                                <div class="form-check-inline">
                                    <input
                                        onChange={(e) =>
                                            setTestData({ ...testData, gender: e.target.value })
                                        }
                                        value="female"
                                        checked={testData.gender === "female"}
                                        class="form-check-input"
                                        type="radio"
                                        name="gender"
                                        id="female"
                                    // value="female"
                                    />
                                    <label class="form-check-label" for="female">
                                        Female
                                    </label>
                                </div>
                            </div>
                            <br />
                            <div className=" input-group">
                                <label for="name" class="form-label-inline">
                                    Height
                                </label>
                                <input
                                    onChange={(e) =>
                                        setTestData({ ...testData, height: e.target.value })
                                    }
                                    value={testData.height}
                                    name="height"
                                    type="text"
                                    class="form-control mx-2 "
                                    id="hight"
                                    placeholder="Enter Height"
                                />
                                <label for="name" class="form-label-">
                                    Weight
                                </label>
                                <input
                                    onChange={(e) =>
                                        setTestData({ ...testData, weight: e.target.value })
                                    }
                                    value={testData.weight}
                                    name="weight"
                                    type="text"
                                    class="form-control mx-2"
                                    id="weight"
                                    placeholder="Enter Weight"
                                />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a username.</div>
                            </div>
                            <div>
                                <label for="name" class="form-label">
                                    DOB
                                </label>
                                <input
                                    onChange={(e) =>
                                        setTestData({ ...testData, dob: e.target.value })
                                    }
                                    value={testData.dob}
                                    name="dob"
                                    type="date"
                                    class="form-control"
                                    id="dob"
                                    placeholder="Enter Your DOB"
                                />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a username.</div>
                            </div>
                            <div>
                                <label for="name" class="form-label">
                                    DOCS
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) =>
                                        setTestData({ ...testData, docs: e.target.value })
                                    }
                                    value={testData.docs}
                                    class="form-control"
                                    id="docs"
                                    name="docs"
                                />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a username.</div>
                            </div>
                        </div>

                        <div class="modal-footer bg-warning">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleAddTest}
                                type="button"
                                data-bs-dismiss="modal"
                                class="btn btn-primary">
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* test modal end */}
        </>
    );
};

export default Test;