import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BiBuildings, BiBus, BiCar, BiCloudSnow, BiCycling, BiLogoAirbnb, BiLogoTripAdvisor, BiPyramid, BiRun, BiSolidCity, BiSolidFlame, BiSolidHotel, BiSolidPlane, BiSolidPlaneTakeOff, BiSolidShip, BiSwim, BiTrain, BiWalk, BiWater, } from "react-icons/bi";


const Home = () => {

  const [listings, setListings] = useState([]);

  const handleShowListings = () => {
    axios.get('http://localhost:8080/listings').then((response)=> {
      setListings(response.data.data)
      console.log(response.data.data)
    }).catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    handleShowListings();
  },[])

  return (
    <>
    <div className="icon_bar col-10 offset-1 d-flex justify-content-evenly d-md-flex d-sm-none">
      <div className="single_icon">
        <i className='icon'><BiSolidFlame/></i>
        <p className='icon-text'>Trending</p>
      </div>
      <div className="single_icon">
        <i className='icon'><BiSolidHotel/></i>
        <p className='icon-text'>Rooms</p>
      </div>
      <div className="single_icon">
        <i className='icon'><BiSolidShip/></i>
        <p className='icon-text'>Boats</p>
      </div>
      <div className="single_icon">
        <i className='icon'><BiTrain/></i>
        <p className='icon-text'>Train</p>
      </div>
      <div className="single_icon">
        <i className='icon'><BiBus/></i>
        <p className='icon-text'>Bus</p>
      </div>
      <div className="single_icon">
        <i className='icon'><BiSolidPlaneTakeOff/></i>
        <p className='icon-text'>Flight</p>
      </div>
      <div className="single_icon">
        <i className='icon'><BiCycling/></i>
        <p>Cycling</p>
      </div>
      <div className="single_icon">
        <i className='icon'><BiRun/></i>
        <p className='icon-text'>Marathon</p>
      </div>
    </div>
            <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 body">
              {listings && listings.map((listing) => (
                <a href={`/detail/${listing._id}`} className='card col'>
                  <img src={listing.img} alt="" className="card-img-top" />
                  {/* <img src={`http://localhost:8080/${listing.img}`} alt="" className="card-img-top" /> */}
                  <div className="card-img-overlay"></div>
                  <div className="card-body">
                    <p className="card-text">
                      <b>{listing.title}</b> <br />
                      &#8360; {listing.price.toLocaleString("en-PK")} / night</p>
                  </div>
                </a>

              ))}
            </div>
    </>
  )
}

export default Home;