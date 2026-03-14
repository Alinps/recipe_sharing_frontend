import React from "react";
import Hero from "../components/Hero";
import RecipeCard from "../components/RecipeCard";

function Home() {
  return (
    <div>

      <Hero />

      <div className="container mt-5">

        <h2 className="text-warning mb-4">
          Featured Recipes
        </h2>

        <div className="row">

          <RecipeCard
            title="Spaghetti Carbonara"
            image="https://images.unsplash.com/photo-1603133872878-684f208fb84b"
            chef="Chef Marco"
          />

          <RecipeCard
            title="Grilled Steak"
            image="https://images.unsplash.com/photo-1551183053-bf91a1d81141"
            chef="Chef John"
          />

          <RecipeCard
            title="Classic Burger"
            image="https://images.unsplash.com/photo-1550547660-d9450f859349"
            chef="Chef Anna"
          />

        </div>

      </div>

    </div>
  );
}

export default Home;