import React from "react";
import Header from "../components/Header";
import useRole from "../hooks/useRole";
import Footer from "../components/Footer";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SimpleSlider from "../components/Slider";
import AboutUs from "../components/Aboutus";

const Home = () => {
  // const role = useRole();
  // console.log(role);


  // let chars = ['Bcs', 'Bcs', 'A', 'C', 'B'];
  // let uniqueChars = [...new Set(chars)];
  // console.log(uniqueChars); // Output: ['A', 'B', 'C']
  // const func =()=>{
  //   const c = window.document.getElementById("test")
  //  console.log(c.value," >>>>>>>>?????????????????");
     
  //  const res = window.document.getElementById("demo")
  
  // res.value = c.value
  // console.log(res.value,"???????/");
  // }

  // const myFunc = ()=>{
  //   window.document.getElementById("demo").innerHTML = "You are a human";
  //   console.log(myFunc());
    
  //   return true
  // }
  // if (myFunc == true) {
    
  // }else{
  //   document.getElementsByClassName("kk").innerHTML = "Robot";
  // }
  
  // const isHuman = "" 
  
  return (
    <>
      <Header />
      <div className=" container-fluid  p-0">
        <SimpleSlider />
      </div>
      <AboutUs />
 {/* <div>
  <input type="text " placeholder="type Name" id="test" className="kk" />
  <p id="test1"></p>
  <button type=" button" onClick={()=>func() } onkeydown={()=>myFunc()} className="btnu">Click it</button>
  <input type="text " id="demo"  className="kk"/>
  <p id="demo1"></p>
 </div> */}
      <Footer />
    </>
  );
};

export default Home;
