import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PathologyAcceptOrderAction, PathologyReportUploadAction, getPathologyOrders } from "../../redux/actions/PathologyActions"

import { toast } from "react-toastify"
import { pathologyReset } from "../../redux/slices/pathologySlice"
const PathologyDashboard = () => {
    const dispatch = useDispatch()

    const { loading, error, orders, accept, reportUpload } = useSelector(state => state.pathology)
    useEffect(() => {
        dispatch(getPathologyOrders())
    }, [])
    useEffect(() => {
        if (error) {
            toast.error(error)
            pathologyReset(['error'])
        }
        if (accept) {
            toast.success("Order Accept Success")
            dispatch(getPathologyOrders())
            pathologyReset(['accept'])
        }
        if (reportUpload) {
            toast.success("Report Upload Success")
            dispatch(getPathologyOrders())
            pathologyReset(['reportUpload'])
        }
    }, [error, accept, reportUpload])
    const TABLE = orders && <>
        <table class="table table-dark table-striped table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <td>Patient Name</td>
                    <td>Mobile</td>
                    <td>Test</td>
                    <td>Docs</td>
                    <td>Action</td>
                </tr>
            </thead>
            <tbody>

                {
                    orders.map((item, i) => <tr key={item._id}>
                        <td>{i + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.mobile}</td>
                        <td>{item.test.map(t => <li>{t.testId.name}</li>)}</td>
                        <td>{item.docs.map(d => <img
                            src={d}
                            alt=""
                            height={50} />)}</td>
                        <td>
                            {
                                item.status === "accept"
                                    ? <>
                                        <button
                                            type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target="#reportModal"
                                            onClick={e => setSelectedOrder(item)}
                                            class="btn btn-outline-warning">
                                            Upload Reports
                                        </button>
                                    </>
                                    : <>
                                        <button
                                            onClick={e => dispatch(PathologyAcceptOrderAction(item))}
                                            type="button"
                                            class="btn btn-primary">
                                            Accept
                                        </button>
                                    </>
                            }

                        </td>
                    </tr>)
                }
            </tbody>
        </table>
    </>
    const [repoertData, setRepoertData] = useState({})
    const handleChange = e => {
        const reportPreview = []
        for (let i = 0; i < e.target.files.length; i++) {
            const url = URL.createObjectURL(e.target.files[i])
            reportPreview.push(url)
        }
        setRepoertData({
            ...repoertData,
            preview: reportPreview,
            reports: e.target.files
        })
    }
    const [selectedOrder, setSelectedOrder] = useState()
    const handleuploadreport = () => {
        const fd = new FormData()
        for (let i = 0; i < repoertData.reports.length; i++) {
            fd.append("reports", repoertData.reports[i])
        }
        dispatch(PathologyReportUploadAction({ _id: selectedOrder._id, fd }))
    }
    if (loading) return <div class="spinner-border text-primary"></div>
    return <>
        {TABLE}


        <div class="modal fade" id="reportModal" >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Upload Reports</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div>
                            <label for="report" class="form-label">Upload Reports</label>
                            <input
                                type="file"
                                multiple
                                onChange={handleChange}
                                class="form-control"
                                id="report"
                                placeholder="Enter Your Name" />
                            <div class="valid-feedback">Looks good!</div>
                            <div class="invalid-feedback">Please choose a username.</div>
                        </div>
                        <div className="my-3">
                            <label for="screenshot" class="form-label">Upload Payment Screenshot</label>
                            <input type="file" class="form-control" id="screenshot" p />
                            <div class="valid-feedback">Looks good!</div>
                            <div class="invalid-feedback">Please choose a username.</div>
                        </div>
                        <hr />
                        {
                            repoertData.preview && repoertData.preview.map(item => <img src={item} height={50} alt="" />)
                        }

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleuploadreport} type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default PathologyDashboard