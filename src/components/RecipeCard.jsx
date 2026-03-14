import React from "react";

function RecipeCard({ title, image, chef }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card recipe-card text-white">

        <img
          src={image}
          className="card-img-top"
          alt={title}
        />

        <div className="card-body">

          <h5 className="card-title">{title}</h5>

          <p className="card-text text-muted">
            By {chef}
          </p>

          <button className="btn btn-warning">
            View Recipe
          </button>

        </div>

      </div>
    </div>
  );
}

export default RecipeCard;