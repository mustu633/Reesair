import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useUser } from "./userContext";

axios.defaults.withCredentials = true;

const Login = () => {

  const { addUser } = useUser();

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleLoginUser = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("username", formData.username);
    data.append("password", formData.password);

    axios
      .post("http://localhost:8080/login", data)
      .then((response) => {
        if (response) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "You are Logged in successfully!",
            showConfirmButton: false,
            timer: 1000,
          });
        }
        addUser(response.data.user);
        setErrors({});
        navigate("/");
      })
      .catch((error) => {
        console.log("get error !!!")
        console.log(error);
        if (error) {
          Swal.fire({
            icon: "error",
            title: "Error in Login! try again!",
          });
        }
        if (
          error.response &&
          error.response.data
        ) {
          console.log(error.response.data)
          setErrors(error.response.data)
          console.log(errors)
          }
          else {
          console.error("Error submitting form:", error);
        }
      });
  };

  return (
    <>
      <div className="body d-flex">
        <div className="col-6 offset-3 my-auto">
          <h3 className="heading text-center">Login to your account.</h3>
          <br />
          <form onSubmit={handleLoginUser} className="needs-validation" noValidate>
            <div>
              <input
                type="text"
                id="username"
                name="username"
                onChange={handleChange}
                placeholder="Enter username"
                className="form-control"
              ></input>
            </div>
            <br />
            <div>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                placeholder="Enter username"
                className="form-control"
              ></input>
            </div>
            <br />
            <button className="btn btn-success text-center">Login</button>
            <br />
            <br />
            <p>New here <a href="/signup">create account</a></p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
