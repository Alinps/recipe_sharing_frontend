import { useState, useEffect } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import styles from "./Recipes.module.css";
import API from "../../services/api";


function Recipes() {

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchRecipes = async () => {

      try {

        const response = await API.get("list/");

        setRecipes(response.data.recipes);

      } catch (err) {

        setError("Failed to load recipes");

      } finally {

        setLoading(false);

      }

    };

    fetchRecipes();

  }, []);

  return (

    <div className="container">
      <section className="section">
        <h1 className={styles.title}>All Recipes</h1>

        {loading && (
          <p className={styles.message}>Loading recipes...</p>
        )}

        {error && (
          <p className={styles.error}>{error}</p>
        )}
        <div className={styles.grid}>
          {recipes.map((recipe) => (

            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              chef={recipe.user.name}
              image={recipe.image}
            />

          ))}

        </div>

      </section>

    </div>

  );

}

export default Recipes;