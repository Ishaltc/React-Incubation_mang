import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react'
// import Button from 'react-bootstrap/Button';
// import Table from 'react-bootstrap/Table'
import "./ViewUser.css"
import EditUser from './EditUser';
import DataTable from 'react-data-table-component'
import axios from 'axios'

import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { confirmAlert } from 'react-confirm-alert'; // Import
// import 'react-confirm-alert/src/react-confirm-alert.css'; 
// Import css
// import {faTrashAlt, faCoffee} from '@fortawesome/free-solid-svg-icons'
import {
  faCoffee,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons'
import CreateUser from './AddUser';
import AdminHeader from './AdminHeader';

function ViewUsers() {
  const [users, setusers] = useState([]);
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState([]);


  useEffect(() => {
    console.log("ldl");
    getusers();
  }, 
  []
  )

// useEffect (()=> {
//   console.log("kokook");
//   getusers();
// },[<CreateUser/>])



  // useEffect(() => {
  //   console.log("newwwwwww");
   
  // },
  //   [
  //     <CreateUser />

  //   ]
  // )

 

  const getusers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/admin/getUsers")
      setusers(response.data)
      // console.log(response.data)
      setFilter(response.data);

    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id) => {

    console.log(id);
    try {

      const deleteUsers = await axios.delete(`http://localhost:4000/admin/deleteUser/${id}`)

      getusers()
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'User has been deleted',
        showConfirmButton: false,
        timer: 1500
      })
    }
    catch (err) {
      console.log(err)
    }
  }


  const columns = [

    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true
    },
   
    {
      name: " Email",
      selector: (row) => row.email,
    },

    {
      name: " Edit",
      selector: (row) => <EditUser name={row.name}  email={row.email} id={row._id} reload={getusers} />
    },
     {
      name: " Delete",
      selector: (row) => <FontAwesomeIcon className='delete-icon' onClick={() => { deleteUser(row._id) }} icon={faTrashAlt} color='red' fontSize='large' ></FontAwesomeIcon>,
    },


    // {
    //     name: " Create",
    //      selector: (row) =>  <CreateUser />
    // },
  ]
 

  useEffect(() => {
    const result = users.filter(country => {
      return country.name.toLowerCase().match(search.toLowerCase());
    })
    setFilter(result)
  }, [search])
  return (
    <>
    <AdminHeader />
   <span className='addButton'>
        <CreateUser getusers={getusers} />
      </span>
     
   
      {/* <Navbar /> */}
      <div className='data-card' style={{ "padding": "100px 200px" }}>
        {/* <button color='light' name='Create' >
          <CreateUser />
        </button> */}
        <DataTable columns={columns}
          data={filter}
          pagination
          fixedHeader
          fixedHeaderScrollHeight='900px'
          selectableRows
          selectableRowsHighlight
          highlightOnHover
          persistTableHead
          subHeader
          style={{ "border": "1px solid" }}
          subHeaderComponent={<input type='text' placeholder='Search Here' className='w-25 form-control' value={search} onChange={(e) => setSearch(e.target.value)} />} />
      </div>
    </>
  )
}


export default ViewUsers