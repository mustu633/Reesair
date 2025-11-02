import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'

const Delete = () => {

    const params = useParams()
    // Delete Product:

    const deleteProduct = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3058d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if(result.isConfirmed){
          axios.post(`http://localhost:8080/product/delete/${params.id}`).then((response)=> {
        if(response){
          Swal.fire({
          position: "center",
          icon: "delete",
          title: "Product deleted successfully!",
          showConfirmButton: true,
          
          // timer: 1500,
          })
        }
      }).catch((error) => {
        Swal.fire({
          title: "Error",
          text: "Failed to delete please try again later!",
          icon: "error",
          confirmButtonText: "OK"
        })
      })
        }
      })
    }

    useEffect(() => {
        deleteProduct();
      }, {})

  return (
    <>
    <div className="main-container single-page single-detail">
        <div className="page-heading">
          <h1>Delete</h1>
        </div>
        <div className="card">
          <Link id="go-back" to='/'>Go Back</Link>
        </div>
      </div>
    </>
  )
}

export default Delete