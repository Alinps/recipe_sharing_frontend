import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import styles from "./RecipeDetails.module.css";

function RecipeDetails() {

  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BASE_URL = "http://127.0.0.1:8000";

  useEffect(() => {

    const fetchRecipe = async () => {

      try {

        const response = await API.get(`recipedetails/${id}`);

        setRecipe(response.data.data);

      } catch (err) {

        setError("Failed to load recipe");

      } finally {

        setLoading(false);

      }

    };

    fetchRecipe();

  }, [id]);

  if (loading) return <p>Loading recipe...</p>;

  if (error) return <p>{error}</p>;

  return (

    <div className="container">
      <div className={styles.wrapper}>
        {/* Image */}
        <div className={styles.imageSection}>
          <img
            src={`${BASE_URL}${recipe.image}`}
            alt={recipe.title}
          />
          </div>


        {/* Content */}
        <div className={styles.content}>
          <h1 className={styles.title}>
            {recipe.title}
          </h1>
          <p className={styles.author}>
            By {recipe.user.name}
          </p>
          <p className={styles.difficulty}>
            Difficulty: {recipe.difficulty_level}
          </p>
          {/* Ingredients */}
          <div className={styles.section}>
            <h2>Ingredients</h2>
            <p>{recipe.ingredients}</p>
          </div>

          {/* Steps */}

          <div className={styles.section}>
            <h2>Instructions</h2>
            <p>{recipe.steps}</p>
          </div>
        </div>
      </div>
    </div>

  );

}

export default RecipeDetails;