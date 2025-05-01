import React from 'react';

export default function AboutUs() {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">About Us</h2>
      
      <div className="row">
        <div className="col-md-6">
          <h4>Our Mission</h4>
          <p>
            At MovieApp, our mission is to provide movie enthusiasts with a seamless and enjoyable experience to discover, rent, and watch the latest and greatest movies. We strive to bring the best cinematic experiences to your fingertips!
          </p>
        </div>
        <div className="col-md-6">
          <h4>Our Team</h4>
          <p>
            We are a group of passionate developers, designers, and movie lovers dedicated to bringing this platform to life. With a shared love for movies, we believe in delivering the highest quality experience for our users.
          </p>
        </div>
      </div>
      
      <div className="text-center mt-5">
        <h4>Get in Touch</h4>
        <p>If you have any questions or feedback, feel free to <a href="mailto:support@movieapp.com">contact us</a>!</p>
      </div>
    </div>
  );
}