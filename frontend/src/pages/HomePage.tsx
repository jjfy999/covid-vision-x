import React from "react";
import "../../../static/patient/css/Home.css";
import Header from "./templates/Header";
import homeImg from '../../../static/images/homeImg.webp';

function AboutUs() {
  return (
    <div id="home-container">
        <Header userRole={"patient"} />
        <div id="image-container">
            <img src={homeImg} alt="Covid Vision X" id="homeImage" />
        </div>
        <div id="content-container">
            <h1 id="header">COVID VISION X</h1>
            <p id="subtitle">Covid-19 Diagnosis System with X-ray Images</p>
            <p id="about-us-paragraph">
                Established in 2020 amidst the global pandemic, Covid Vision X was born from a shared vision to provide swift, accurate COVID-19 diagnosis through innovative technology. Our platform is dedicated to delivering a seamless and reliable diagnostic experience, leveraging advanced X-ray imaging and artificial intelligence. We believe that healthcare should be accessible to all, and our mission is to empower healthcare providers with the tools they need to combat COVID-19 effectively. As we continue to evolve, we remain steadfast in our commitment to making a positive impact on global health and safety. At Covid Vision X, we're not just revolutionizing diagnosis; we're shaping the future of healthcare.
            </p>
            <div className="btn-container">
                <a href="https://emilygong93.wixsite.com/covidvisionx" id="viewBtn">Learn More</a>
            </div>
        </div>
    </div>
  );
}

export default AboutUs;