import React, { useState } from 'react'

const AddDoctor = () => {

  const [adress, setAdress] = useState([
    { type: "main clinic", val: "fake street" }
  ])
  const [mobile, setMobile] = useState([
    { num: "8888888899", type: "fake place" }
  ])

  const [doctorData, setDoctorData] = useState({
    name: "john",
    clinicName: "John's Clinic",
    dob: "",
    doa: "",
    education: "",
    email: "",
    gender: "",
  })

  const [profilePic, setProfilePic] = useState({
    preview: "",
    avatar: ""
  })
  const hnadleImage = e => {
    console.log(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0])
    setProfilePic({ preview: url, avatar: e.target.files[0] })

  }
  const handleAddDoctor = () => {
    console.log({
      ...doctorData,
      avatar: profilePic.avatar,
      mobile: [...mobile],
      address: [...adress]
    });
  }
  const table = <div className='table-responsive'>
    <table class="table table-dark table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Mobile No.</th>
          <th scope="col">hospital / clinic name</th>
          <th scope="col">Education</th>
          <th scope="col">Adress</th>
          <th scope="col">DOB</th>
          <th scope="col">DOA</th>
          <th scope="col">Gender :</th>
          <th scope="col">Doctor Email</th>
          <th scope="col">Avatar</th>
        </tr>
      </thead>
      <tbody>

      </tbody>
    </table>
  </div>

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

      <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">

          <div class="modal-header bg-warning">
            <h5 class="modal-title" id="doctorModal">Add Doctor's details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body alert alert-warning">

            <pre>
              {JSON.stringify(mobile, null, 2)}
            </pre>
            Name
            <input
              className='form-control '
              value={doctorData.name}
              onChange={e => setDoctorData({ ...doctorData, name: e.target.value })}
              type="text"
              name=""
              id="doctorName"
              placeholder="Enter doctor's name" /><br />

            Mobile No.
            {
              mobile.map((item, i) => <div>
                <div className='input-group my-1'>
                  <input
                    value={mobile[i].num}
                    type='number'
                    onChange={e => {
                      const copy = [...mobile]
                      copy[i].num = e.target.value
                      setMobile(copy)
                    }}
                    class="form-control"
                    id="mobile"
                    placeholder='Enter doctors Mobile' />
                  <select class="form-select" onChange={e => {
                    const copy = [...mobile]
                    copy[i].type = e.target.value
                    setMobile(copy)
                  }}>
                    <option selected>Choose Type</option>
                    <option value="primary">Primary</option>
                    <option value="clinic">Clinic</option>
                    <option value="home">Home</option>
                    <option value="personal">Personal</option>
                  </select>

                  {
                    i === 0 ? <button
                      disabled={mobile.length >= 4}
                      onClick={e => setMobile([...mobile,
                      { num: "new mobile" }
                      ])}
                      type="button"
                      class="btn btn-primary"
                    >+</button>
                      : <button
                        onClick={e => {
                          const copy = [...mobile]
                          copy.splice(i, 1)
                          setMobile(copy)
                        }}
                        type="button"
                        class="btn btn-danger"
                      >-</button>
                  }
                </div><br />
              </div>)
            }

            Enter hospital / clinic name
            <input
              className='form-control my-1'
              value={doctorData.clinicName}
              onChange={e => setDoctorData({ ...doctorData, clinicName: e.target.value })}
              type="text"
              name=""
              id="education"
              placeholder='Enter hospital / clinic name' /><br />
            Education
            <input
              value={doctorData.education}
              onChange={e => setDoctorData({ ...doctorData, education: e.target.value })}
              className='form-control my-1'
              type="text"
              name=""
              id="education"
              placeholder='Enter education' /><br />
            Adress
            {
              adress.map((item, i) => <div>
                <div className='input-group my-3'>
                  <select class="form-select" onChange={e => {
                    const copy = [...adress]
                    copy[i].type = e.target.value
                    setAdress(copy)
                  }}>
                    <option selected>Choose Type</option>
                    <option value="primary">Primary</option>
                    <option value="clinic">Clinic</option>
                    <option value="home">Home</option>
                  </select>
                  <input
                    value={adress[i].val}
                    onChange={e => {
                      const copy = [...adress]
                      copy[i].val = e.target.value
                      setAdress(copy)
                    }}
                    class="form-control"
                    id="adress"
                    placeholder='Adress' />
                  {
                    i === 0 ? <button
                      disabled={adress.length >= 4}
                      onClick={e => setAdress([...adress,
                      { type: "new Adress", val: "fake street" }
                      ])}
                      type="button"
                      class="btn btn-primary"
                    >+</button>
                      : <button
                        onClick={e => {
                          const copy = [...adress]
                          copy.splice(i, 1)
                          setAdress(copy)
                        }}
                        type="button"
                        class="btn btn-danger"
                      >-</button>
                  }
                </div><br />
              </div>)
            }
            DOB
            <input
              className='form-control my-1 '
              value={doctorData.dob}
              onChange={e => setDoctorData({ ...doctorData, dob: e.target.value })}
              type="date"
              name=""
              id="doctorName"
              placeholder='Enter doctors name' /><br />
            Date Of Annivarsary
            <input
              className='form-control my-1 '
              value={doctorData.doa}
              onChange={e => setDoctorData({ ...doctorData, doa: e.target.value })}
              type="date"
              name=""
              id="doctorName"
              placeholder='Enter doctors name' />
            <br />
            <div className='d-flex gap-2'>
              Gender :
              <div class="form-check">
                <input
                  class="form-check-input"
                  onChange={e => setDoctorData({ ...doctorData, gender: e.target.value })}
                  checked={doctorData.gender === "male"}
                  type="radio"
                  name='gender'
                  value="male"
                  id="male" />
                <label class="form-check-label" htmlFor="male">  Male </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  onChange={e => setDoctorData({ ...doctorData, gender: e.target.value })}
                  checked={doctorData.gender === "female"}
                  type="radio"
                  name='gender'
                  value="female"
                  id="female" />
                <label class="form-check-label" htmlFor="female">
                  Famale
                </label>

              </div>
            </div> <br />
            Doctor Email
            <input
              className='form-control my-1'
              value={doctorData.email}
              onChange={e => setDoctorData({ ...doctorData, email: e.target.value })}
              type="text"
              name=""
              id="doctorEmail"
              placeholder='Enter doctors email' /><br />
            Avatar
            <input
              className='form-control my-1 '
              type="file"
              onChange={hnadleImage}
              name=""
              id="avtar"
              placeholder='Enter doctors name' />
            <br />


          </div>
          <div class="modal-footer bg-warning">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
            <button
              onClick={handleAddDoctor}
              type="button"
              class="btn btn-success"
              data-bs-dismiss="modal">Save changes</button>
          </div>
        </div>
      </div>
    </div >
    {/* modal doctor end */}
  </>
}

export default AddDoctor