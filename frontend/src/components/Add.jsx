import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { useUser } from "./userContext";
import { useNavigate } from "react-router-dom";

const Add = () => {

  const {user} = useUser();
  const navigate = useNavigate();

  const checkUser = () => {
    if(!user._id){
      navigate("/");
    }else{
      return;
    }
  }

  useEffect(()=>{
    checkUser();
  }, [])

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    img: 30,
    description: "",
    price: "",
    location: "",
    country: ""
  });

  const handleChange = (e) => {
    const {id, value} = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      img: e.target.files[0],
    }));
  };

  const handleCreateListing = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append('title', formData.title);
    data.append("img", formData.img);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('location', formData.location);
    data.append('country', formData.country);

    axios.post('http://localhost:8080/listings', data)
    .then((response) => {
      if(response){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Product added successfully!",
          showConfirmButton: false,
          timer: 1000,
        })
      }
      setErrors({});
    })
    .catch((error) => {
      if(error){
        Swal.fire({
          icon: "error",
          title: "Error detected in adding product!"
        })
      }
      if (
        error.response &&
        error.response.data &&
        error.response.data.errors
      ) {
        if(error.response.errors){
          Swal.fire({
            icon: "error",
            title: "Error detected in adding product!"
          })
        }
        const backendErrors = {};
        error.response.data.errors.forEach((err) => {
          backendErrors[err.path] = err.msg;
        });
        setErrors(backendErrors);
        
      } else {
        console.error("Error submitting form:", error);
      }
    });
  };

  return (
    <>
        <div className="row body">
          <div className="col-8 offset-0.5">
          <h3 className="heading">Create New Listing</h3>
          <form onSubmit={handleCreateListing}>
          <div>
          <input type="text" id="title" placeholder="Enter title" defaultValue={formData.title} onChange={handleChange} className="form-control"></input>
          {errors.title && (
                    <p className="errMsg">{errors.title}</p>
                  )}
          </div>
          <div>
          <textarea cols="30" rows="5" id="description" placeholder="Enter description" defaultValue={formData.description} onChange={handleChange} className="form-control mt-2">
            
          </textarea>
          {errors.description && (
            <p className="errMsg">{errors.description}</p>
          )}
          </div>
          <div className="row mt-2 flex">
          <div className="col-4">
            <input
              type="number"
              id="price"
              defaultValue={formData.price}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter price"
            ></input>
            {errors.price && (
            <p className="errMsg">{errors.price}</p>
          )}
          </div>
          <div className="col-4">
            <input
              type="text"
              className="form-control"
              id="location"
              defaultValue={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
            ></input>
            {errors.location && (
            <p className="errMsg">{errors.location}</p>
          )}
          </div>
          <div className="col-4">
            <input
              type="text"
              className="form-control"
              id="country"
              defaultValue={formData.country}
              onChange={handleChange}
              placeholder="Enter country"
            ></input>
            {errors.country && (
            <p className="errMsg">{errors.country}</p>
          )}
          </div>
          </div>
          <div>
          <input type="file" onChange={handleFileChange} className="form-control mt-2" />
          {errors.img && (
            <p className="errMsg">{errors.img}</p>
          )}
          </div>
          <br />
          <button className="btn btn-success">Add</button>
        </form>
          </div>
        </div>
    </>
  );
};

export default Add;
