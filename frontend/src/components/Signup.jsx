import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
import { useUser } from "./userContext";


const Signup = () => {
  const [errors, setErrors] = useState({});

  const { user } = useUser();

  const navigate = useNavigate();

  const checkUser = () => {
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

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);

    axios
      .post("http://localhost:8080/signup", data)
      .then((response) => {
        if (response) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "You are registered successfully!",
            showConfirmButton: false,
            timer: 1000,
          });
        }
        setErrors({});
        navigate("/")
      })
      .catch((error) => {
        console.log(error);
        if (error) {
          Swal.fire({
            icon: "error",
            title: "Error in registering! try again!",
          });
        }
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          if (error.response.errors) {
            Swal.fire({
              icon: "error",
              title: "Error in registering! try again!",
            });
          }
          const backendErrors = {};
          error.response.data.errors.forEach((err) => {
            backendErrors[err.path] = err.msg;
          });
          setErrors(backendErrors);
          console.log(errors);
        } else {
          console.error("Error submitting form:", error);
        }
      });
  };

  return (
    <>
      <div className="body d-flex">
        <div className="col-6 offset-3 my-auto">
          <h3 className="heading">Signup to Reesair</h3>
          <br />
          <form
            onSubmit={handleRegisterUser}
            className="needs-validation"
            noValidate
          >
            <div>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter username"
                defaultValue={formData.username}
                onChange={handleChange}
                className="form-control"
              ></input>
              {errors.MissingUsernameError && (
                <p className="errMsg">{errors.MissingUsernameError}</p>
              )}
              {errors.UserExistsError && (
                <p className="errMsg">{errors.UserExistsError}</p>
              )}
            </div>
            <br />
            <div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
                defaultValue={formData.email}
                onChange={handleChange}
                className="form-control"
              ></input>
              {errors.email && <p className="errMsg">{errors.email}</p>}
            </div>
            <br />
            <div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter username"
                defaultValue={formData.password}
                onChange={handleChange}
                className="form-control"
              ></input>
              {errors.MissingPasswordError && (
                <p className="errMsg">{errors.MissingPasswordError}</p>
              )}
            </div>
            <br />
            <button className="btn btn-success">Signup</button>
            <br />
            <br />
            <p>Already have account <a href="/login">login</a></p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
