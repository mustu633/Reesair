import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useUser } from "./userContext";

const Edit = () => {

  const user = useUser();

  const navigate = useNavigate();

  const checkUser = () => {
    console.log(user);
    if(!user._id){
      navigate("/")
    }
    else{
      return;
    }
  }

  useEffect(() => {
    checkUser();
  },[])

  const params = useParams();

  const [errors, setErrors] = useState({});

  const [prevImg, setprevImg] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    img: null,
    description: "",
    price: "",
    location: "",
    country: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/listings/${params.id}`)
      .then((response) => {
        const { title, description, price, location, country, img } =
          response.data.data;
        setFormData({
          title,
          description,
          price,
          location,
          country,
          img: null,
        });

        if (img) {
          setprevImg(`http://localhost:8080/${img}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleFileChange = (e) => {
    const img = e.target.files[0];

    if (img) {
      setFormData((prevData) => ({
        ...prevData,
        img: img,
      }));
    }
    setprevImg(URL.createObjectURL(img));
  };

  const handleEditListing = (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("title", formData.title);
    data.append("img", formData.img);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("location", formData.location);
    data.append("country", formData.country);

    axios
      .put(`http://localhost:8080/listings/${params.id}`, data)
      .then((response) => {
        if (response) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Listing updated successfully!",
            showConfirmButton: false,
            timer: 1000,
          });
        }
        setErrors({});
      })
      .catch((error) => {
        if (error) {
          Swal.fire({
            icon: "error",
            title: "Error detected in updating Listing!",
          });
        }
        if (error.response?.data?.errors) {
          const backendErrors = {};
          error.response.data.errors.forEach((err) => {
            backendErrors[err.path] = err.msg;
          });
          setErrors(backendErrors);
        } else {
          console.error("Error editing listing:", error);
        }
      });
  };

  return (
    <>
      <div className="row body">
        <div className="col-8 offset-0.5">
          <h3 className="heading">Edit your listing</h3>
          <form onSubmit={handleEditListing}>
            <div>
              <input
                type="text"
                id="title"
                placeholder="Enter title"
                defaultValue={formData.title}
                onChange={handleChange}
                className="form-control"
              ></input>
              {errors.title && <p className="errMsg">{errors.title}</p>}
            </div>
            <div>
              <textarea
                cols="30"
                rows="5"
                id="description"
                placeholder="Enter description"
                defaultValue={formData.description}
                onChange={handleChange}
                className="form-control mt-2"
              ></textarea>
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
                {errors.price && <p className="errMsg">{errors.price}</p>}
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
                {errors.location && <p className="errMsg">{errors.location}</p>}
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
                {errors.country && <p className="errMsg">{errors.country}</p>}
              </div>
            </div>
            <div>
              <input
                type="file"
                onChange={handleFileChange}
                className="form-control mt-2"
              />
              {errors.img && <p className="errMsg">{errors.img}</p>}
            </div>
            <br />
            <button className="btn btn-success">Update</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
