import React, { useState } from 'react'

const AddDoctor = () => {

  const [address, setAddress] = useState([
    { type: "main clinic", val: "fake street" }
  ])

  const table = <table class="table table-dark table-striped table-hover">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td colspan="2">Larry the Bird</td>
        <td>@twitter</td>
      </tr>
    </tbody>
  </table>

  /*
    name                            M
    mobile multiple with lable      M
    hospital / clinic name          M
    address / multile lable         M                                        
    gender                          M
    avatar                          O
    education                       O
    dob                             O
    date of anv.                    O
    email                           O
  */

  return <>
    <div className="container">
      <div className='text-end my-3'>

        <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#doctorModal"> Add Doctor</button>
      </div>
      <div className="row">
        {table}
      </div>
    </div>

    {/* modal doctor start */}



    <div class="modal fade" id="doctorModal" >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="doctorModal">Add Doctor's details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">

            <pre>
              {JSON.stringify(address, null, 2)}
            </pre>

            {
              address.map((item, i) => <div className='input-group my-3'>
                <select class="form-select" onChange={e => {
                  const copy = [...address]
                  copy[i].type = e.target.value
                  setAddress(copy)
                }}>
                  <option >Choose Type</option>
                  <option value="Primary">Primary</option>
                  <option value="Clinic">Clinic</option>
                  <option value="Home">Home</option>
                </select>
                <input
                  className='form-control '
                  type="text"
                  name=""
                  value={address[i].val}
                  id="doctorMobile"
                  onChange={e => {
                    const copy = [...address]
                    copy[i].val = e.target.value
                    setAddress(copy)
                  }
                  }
                  placeholder='Enter doctors Address' />
                {
                  i === 0
                    ? <button
                      type="button"
                      disabled={address.length >= 2}
                      class="btn btn-primary"
                      onClick={e => setAddress([
                        ...address,
                        { type: "new address", val: "fake street" }
                      ])}
                    >+</button>
                    : <button
                      type="button"
                      class="btn btn-danger"
                      onClick={e => {
                        const copy = [...address]
                        copy.splice(i, 1)
                        setAddress(copy)
                      }}
                    >-</button>
                }

              </div>)
            }


          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    {/* modal doctor end */}
  </>
}

export default AddDoctor