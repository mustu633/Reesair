import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiBasket, BiBox, BiDetail, BiEdit, BiHeading, BiInfoCircle, BiLocationPlus, BiLockAlt, BiLogoFacebook, BiMedal, BiPin, BiStar, BiTrash, BiUnlink } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useUser } from "./userContext";

const Single = () => {

  const {user} = useUser();

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const params = useParams();

  const [listing, setListing] = useState({
    title: "",
    description: "",
    img: null,
    price: "",
    location: "",
    country: "",
    reviews: []
  });

  const handleShowListing = () => {
    axios
      .get(`http://localhost:8080/listings/${params.id}`)
      .then((response) => {
        setListing(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleShowListing();
  }, []);

  // for delete:
  const handleDeleteListing = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3058d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/listings/${listing._id}`)
          .then((response) => {
            if (response) {
              Swal.fire({
                position: "center",
                icon: "delete",
                title: "Listing deleted successfully!",
                showConfirmButton: true,

                // timer: 1500,
              });
            }
            navigate("/");
          })
          .catch((error) => {
            Swal.fire({
              title: "Error",
              text: "Failed to delete please try again later!",
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      }
    });
  };

  // for review :
  const [formData, setFormData] = useState({
    rating: "3",
    comment: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleCreateReview = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("rating", formData.rating);
    data.append("comment", formData.comment);

    axios
      .post(`http://localhost:8080/listings/${listing._id}/reviews`, data)
      .then((response) => {
        if (response) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Review added successfully!",
            showConfirmButton: false,
            timer: 1000,
          });
        }
        setErrors({});
        navigate(`/detail/${listing._id}`);
      })
      .catch((error) => {
        if (error) {
          Swal.fire({
            icon: "error",
            title: "Error detected in submitting Review!",
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
              title: "Error detected in Submitting Review!",
            });
          }
          const backendErrors = {};
          error.response.data.errors.forEach((err) => {
            backendErrors[err.path] = err.msg;
          });
          setErrors(backendErrors);
        } else {
          console.error("Error submitting Review:", error);
        }
      });
  };

  const handleDeleteReview = (id, reviewId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3058d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/listings/${id}/reviews/${reviewId}`)
          .then((response) => {
            if (response) {
              Swal.fire({
                position: "center",
                icon: "delete",
                title: "Review deleted successfully!",
                showConfirmButton: true,

                // timer: 1500,
              });
            }
            navigate(`/detail/${listing._id}`);
          })
          .catch((error) => {
            Swal.fire({
              title: "Error",
              text: "Failed to delete please try again later!",
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      }
    });
  };

  // for stars:

  function getStars(rating) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating - 1 < i) {
        stars.push(<span>☆</span>);
      } else {
        stars.push(<span>★</span>);
      }
    }
    return stars;
  }

  return (
    <>
      <div className="col-8 offset-2 body">
        <div className="card">
          <img
            src={listing.img}
            // src={`http://localhost:8080/${listing.img}`}
            className="card-img-top show-img"
          ></img>
          <div className="card-body">
              <h5 className="card-text">{listing.title}</h5>
            <li className="card-text">{listing.description}</li>
            <li className="card-text">
              &#8360; {listing.price.toLocaleString("en-PK")} / night
            </li>
            <li className="card-text">
              <i>< BiLocationPlus /></i> {listing.location},{listing.country}
            </li>
          </div>
          <br />
          {user._id && (
          <div className="d-flex justify-content-between">
            <Link title={`Edit ${listing.title}`} className="icon" to={`/edit/${listing._id}`}>
              <i><BiEdit /></i>
            </Link>
            <i
              className="icon"
              title={`Delete ${listing.title}`}
              onClick={() => {
                handleDeleteListing();
              }}
            >
              <BiTrash />
            </i>
          </div>
          )}
        </div>
        <hr />
        <br />
        <h5>All Reviews</h5>
        <div className="row review-box">
        {listing.reviews.map(review => 
        <div className="card">
          <div className="card-body">
            <h6>Mustafa</h6>
            <p className="card-text stars">{getStars(review.rating)}</p>
            <p className="card-text">{review.comment}</p>
            <div className="d-flex justify-content-between">
            {user._id && (
            <i
            title="Delete this review"
              className="icon"
              onClick={() => {
                handleDeleteReview(listing._id, review._id);
              }}
            >
              <BiTrash />
            </i>
            )}
          </div>
          </div>
        </div>
        )}
        </div>
        <hr />

        <br />
        <h5>Write a Review</h5>
        <form onSubmit={handleCreateReview}>
          <div>
            <label for="rating" className="form-label">
              Rating
            </label>
            <input
              type="range"
              min="1"
              max="5"
              name="rating"
              id="rating"
              className="form-control"
              onChange={handleChange}
            />
            {errors.rating && <p className="errMsg">{errors.rating}</p>}
          </div>
          <div>
            <textarea
              name="comment"
              id="comment"
              cols="30"
              rows="7"
              placeholder="Write your review here"
              className="form-control mt-3"
              onChange={handleChange}
            ></textarea>
            {errors.comment && <p className="errMsg">{errors.comment}</p>}
          </div>
          <button className="btn btn-success mt-3">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Single;
