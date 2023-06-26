import React, { useEffect, useState } from 'react'
import { adminAddPathology } from '../../redux/actions/adminActions'
import { useDispatch, useSelector } from 'react-redux'
import { adminReset } from '../../redux/slices/adminSlice'
import { toast } from 'react-toastify'

const AddPathology = () => {


  const [pathologyData, setpathologyData] = useState({
    name: "",
    email: "",
    gender: "male",
    address: ""
  })

  const dispatch = useDispatch()
  const { loading, error, pathologies, pathologyAdded } = useSelector(state => state.admin)
  const handleAddPathology = () => {
    dispatch(adminAddPathology({ ...pathologyData, mobile }))
  }
  useEffect(() => {
    if (pathologyAdded) {
      toast.success("Pathology Added Successfully")
      dispatch(adminReset(["pathologyAdded"]))
    }
    if (error) {
      toast.error(["error"])
    }
  }, [error, pathologyAdded])


  const table = <table className="table table-dark table-striped table-hover">
    <thead>
      <tr>
        <th scope="col">Sr NO</th>
        <th scope="col">Name</th>
        <th scope="col">Pathology Name</th>
        <th scope="col">Mobile No</th>
        <th scope="col">Address</th>
      </tr>
    </thead>
    <tbody>

    </tbody>
  </table>



  const [mobile, setMobile] = useState([
    {
      contactNumber: "8888888899",
      contactType: "primary"
    }
  ])

  if (loading) { return <div class="spinner-border text-primary"></div> }
  return <>
    <div className="container">
      <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#pathoModal"> Add pathology</button>
      <div className="row">
        {table}
      </div>
    </div>

    {/* modal pathology start */}



    <div className="modal fade" id="pathoModal" >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header text-center">
            <h5 className="modal-title" id="pathoModal">Add Pathology's details</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <input value={pathologyData.name}
              onChange={e => setpathologyData({ ...pathologyData, name: e.target.value })}
              className='form-control' type="text" name="" id="name" placeholder='Enter Phlebo Name' /><br />
            <input value={pathologyData.email}
              onChange={e => setpathologyData({ ...pathologyData, email: e.target.value })}
              className='form-control' type="text" name="" id="name" placeholder='Enter Phlebo Email' /><br />
            <input value={pathologyData.address}
              onChange={e => setpathologyData({ ...pathologyData, address: e.target.value })}
              className='form-control' type="text" name="" id="name" placeholder='Enter Phlebo Address' /><br />

            {
              mobile.map((item, i) => <div>
                <div className='input-group '>
                  <input
                    value={mobile[i].contactNumber}
                    type='number'
                    onChange={e => {
                      const copy = [...mobile]
                      copy[i].contactNumber = e.target.value
                      setMobile(copy)
                    }}
                    className="form-control"
                    id="mobile"
                    placeholder='Enter Phlebo Mobile' />
                  <select className="form-select" onChange={e => {
                    const copy = [...mobile]
                    copy[i].contactType = e.target.value
                    setMobile(copy)
                  }}>
                    <option selected>Choose Type</option>
                    <option value="primary">Primary</option>
                    <option value="clinic">Secondary</option>
                    <option value="home">Pathology Lab</option>
                  </select>

                  {
                    i === 0 ? <button
                      disabled={mobile.length >= 3}
                      onClick={e => setMobile([...mobile,
                      { contactNumber: "", contactType: "new mobile" }
                      ])}
                      type="button"
                      className="btn btn-primary"
                    >+</button>
                      : <button
                        onClick={e => {
                          const copy = [...mobile]
                          copy.splice(i, 1)
                          setMobile(copy)
                        }}
                        type="button"
                        className="btn btn-danger"
                      >-</button>
                  }
                </div><br />
              </div>)
            }

            <div className='d-flex gap-2'>
              Gender :
              <div className="form-check">
                <input
                  onChange={e => setpathologyData({
                    ...pathologyData,
                    gender: e.target.value
                  })}
                  checked={pathologyData.gender === "male"}
                  className="form-check-input"
                  type="radio"
                  name='gender'
                  value="male"
                  id="male" />
                <label
                  className="form-check-label" htmlFor="male">  Male </label>
              </div>
              <div className="form-check">
                <input
                  onChange={e => setpathologyData({
                    ...pathologyData,
                    gender: e.target.value
                  })}
                  checked={pathologyData.gender === "female"}
                  className="form-check-input"
                  type="radio"
                  name='gender'
                  value="female"
                  id="female" />
                <label className="form-check-label" htmlFor="female">
                  Famale
                </label>

              </div>
            </div> <br />



            <pre>{JSON.stringify(pathologyData, null, 2)}</pre>
            <pre>{JSON.stringify(mobile, null, 2)}</pre>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" onClick={handleAddPathology} className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    {/* modal pathology end */}
  </>
}

export default AddPathology