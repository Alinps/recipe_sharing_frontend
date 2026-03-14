import React from "react";

function Hero() {
  return (
    <div className="hero-section text-center text-white d-flex align-items-center justify-content-center">

      <div>
        <h1 className="display-4 fw-bold">
          Discover Delicious Recipes
        </h1>

        <p className="lead mt-3">
          Share your cooking passion and explore dishes from chefs around the world
        </p>

        <button className="btn btn-warning btn-lg mt-4">
          Explore Recipes
        </button>
      </div>

    </div>
  );
}

export default Hero;