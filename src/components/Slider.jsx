import React from "react";
import Slider from "react-slick";
import useToken from "../hooks/useToken";
import useRole from "../hooks/useRole";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";




function SimpleSlider() {

  const navigate = useNavigate()
  const token  =  useToken()
  const role = useRole()
 const shopNow = () =>{
     if (token) {
        if (role == 2) {
           navigate('/customer/home')
        }
        if (role == 1) {
          navigate('/admin/dasboard')
        }
        if (role == 3) {
          navigate('/company/dashboard')
        }

     }
     else{
      Swal.fire({
        title: 'Please Login!',
       
        icon:"warning"
      })
      navigate('/login')
     }
 }
 
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    arrows:false
  };
  return (
    <div className="slider-container ">
      <Slider {...settings}>
       
          <div className="slide-one py-5">
            <div className="row p-0 ">
              <div className="col-md-8  ">
                <img
                  src="../images/download (2).png"
                  alt=""
                  width={"100%"}
                  height={"100%"}
                />{" "}
              </div>

              <div className="col-md-4">
                <div className="p-5 main-banner">
                  <h2>Discover the Future of Technology!</h2>
                  <p>
                    Check out the latest gadgets and stay ahead of the curve.
                  </p>
                  <button className="btnu" type="button" onClick={()=>{shopNow()}}>Shop Now</button>
                </div>
              </div>
            </div>
          </div>
       

       
          <div className="slide-four  py-5">
            <div className="row ">
              <div className="col-md-8 ">
                <img
                  src="../images/download (1).png"
                  alt=""
                  width={"100%"}
                  height={"100%"}
                />
              </div>
              <div className="col-md-4">
                <div className="p-5 main-banner">
                  <h2>Exclusive Electronics Sale!</h2>
                  <p>Up to 50% off on select devices.</p>
                  <button className="btnu"  type="button" onClick={()=>{shopNow()}}>Limited Time Offer - Shop Now!</button>
                </div>
              </div>
            </div>
            {/*  */}
          </div>
      

      
          <div className="slide-three  py-5">
            <div className="row ">
              <div className="col-md-8 ">
                <img
                  src="../images/download.png"
                  alt=""
                  width={"100%"}
                  height={"100%"}
                />
              </div>
              <div className="col-md-4">
                <div className="p-5 main-banner">
                <h2>Holiday Electronics Extravaganza!</h2>
                <p>Find the perfect gift for everyone on your list.</p>
                <button className="btnu"  type="button" onClick={()=>{shopNow()}}>Holiday Deals - Shop Now!</button>
                </div>
              </div>
            </div>
            {/* */}
          </div>
       

       
          <div className="slide-five  py-5">
            <div className="row ">
              <div className="col-md-8 ">
                <img
                  src="../images/download (4).png"
                  alt=""
                  width={"100%"}
                  height={"100%"}
                />
              </div>
              <div className="col-md-4">
                <div className="p-5 main-banner">
                <h2>Our Top-Rated Electronics!</h2>
                <p>Trusted by thousands of happy customers.</p>
                <button className="btnu"  type="button" onClick={()=>{shopNow()}}>Explore Top Picks - Shop Now!</button>
                </div>
              </div>
            </div>
            {/*  */}
          </div>
      

      
          <div className="slide-two  py-5">
            <div className="row ">
              <div className="col-md-8 ">
                <img
                  src="../images/download (6).png"
                  alt=""
                  width={"100%"}
                  height={"100%"}
                />
              </div>
              <div className="col-md-4">
                <div className="p-5 main-banner">
                <h2>Just In: Newest Arrivals!</h2>
                <p>Be the first to own the latest electronics.</p>
                <button className="btnu"  type="button" onClick={()=>{shopNow()}}>Check Out What's New - Shop Now!</button>
                </div>
              </div>
            </div>

            {/*  */}
          </div>
       

    
          <div className="slide-six  ">
            <div className="row">
              <div className="col-md-8 ">
                <img
                  src="../images/download9.png"
                  alt=""
                  width={"100%"}
                  height={"100%"}
                  className="img-slider"
                />
                
 
              </div>
              <div className="col-md-4">
                <div className="p-5 main-banner">
                <h2>See What Our Customers Are Saying!</h2>
                <p>Real reviews from real users.</p>
                <button className="btnu"  type="button" onClick={()=>{shopNow()}}>Join the Community - Shop Now!</button>
                </div>
              </div>
            </div>
          </div>
       
      </Slider>
    </div>
  );
}

export default SimpleSlider;

//  <DotLottieReact
// src="https://lottie.host/dbfb5ef8-87fc-4fff-b11d-14687e2f2df1/qw2tmj2y6J.lottie"
// loop
// autoplay
// />

// <DotLottieReact
//       src="https://lottie.host/ed828895-af68-4e86-9c19-f5b4590be84c/4cmpedO6hS.lottie"
//       loop
//       autoplay
//     />

// <DotLottieReact
//       src="https://lottie.host/23d573e2-c49c-49e6-ac3d-ec7535c13a4e/nw0W7OHZ9q.lottie"
//       loop
//       autoplay
//     />

//     <DotLottieReact
//       src="https://lottie.host/29d24418-9b46-4916-a508-dca0a010c70f/ism7LdGrhb.lottie"
//       loop
//       autoplay
//     />

//     <DotLottieReact
//       src="https://lottie.host/927a69c0-06e8-4eca-8e30-268998b141d2/uknURhC5HA.lottie"
//       loop
//       autoplay
//     />

//     <DotLottieReact
//       src="https://lottie.host/c01c7e55-15f0-4f31-89df-0feb1256492b/tXicN5h8Y5.lottie"
//       loop
//       autoplay
//     />
