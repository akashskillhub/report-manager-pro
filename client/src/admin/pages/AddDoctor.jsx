import React from 'react'

const AddDoctor = () => {


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
  
  return <>
  <div className="container">
    <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#doctorModal"> Add Doctor</button>
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
            <input className='form-control' type="text" name="" id="doctorName"  placeholder='Enter doctors name'/><br /> 
            <input className='form-control' type="text" name="" id="doctorEmail" placeholder='Enter doctors email' /><br /> 
            <input className='form-control' type="text" name="" id="doctorMobile" placeholder='Enter doctors Mobile' /><br /> 
            
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