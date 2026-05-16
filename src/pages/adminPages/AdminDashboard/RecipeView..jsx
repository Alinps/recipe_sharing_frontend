import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../services/api";
import { useToast } from "../../../context/useToast";
import styles from "./AdminTable.module.css";

function RecipeView() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    let isMounted = true;

    const fetchRecipeDetails = async (recipeId) => {
      try {
        const response = await API.get(`/user_admin/recipedetail/${recipeId}`);
        const payload = response.data?.data ?? response.data;

        if (isMounted) {
          setRecipe(payload || null);
        }
      } catch (error) {
        let message = "Failed to fetch recipe details";

        if (error.response?.data) {
          const data = error.response.data;

          if (data.error) {
            message = data.error;
          } else {
            const firstKey = Object.keys(data)[0];
            const value = data[firstKey];
            message = Array.isArray(value) ? value[0] : value;
          }
        }

        showToast(message, "error");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRecipeDetails(id);

    return () => {
      isMounted = false;
    };
  }, [id, showToast]);

  

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h5 className={styles.title}>Recipe Details</h5>
          </div>
          <div className={styles.searchWrap}>Loading recipe...</div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h5 className={styles.title}>Recipe Details</h5>
          </div>
          <div className={styles.searchWrap}>Recipe not found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h5 className={styles.title}>{recipe.title || "Untitled Recipe"}</h5>
          <span className={styles.badge}>ID: {recipe.id}</span>
        </div>

        <div className={styles.searchWrap}>
          <p><strong>Description:</strong> {recipe.description || "Not available"}</p>
          <p><strong>Ingredients:</strong> {recipe.ingredients || "Not available"}</p>
          <p><strong>Instructions:</strong> {recipe.steps || "Not available"}</p>
          <p><strong>Cooking Time:</strong> {recipe.cooking_time || "Not available"}</p>
          <p><strong>Difficulty:</strong> {recipe.difficulty_level || "Not available"}</p>
          <p><strong>Created At:</strong> {recipe.created_at || "Not available"}</p>
        </div>

        <div className={styles.searchWrap}>
          <p><strong>Image:</strong></p>
          <img
            src={recipe.image || "https://via.placeholder.com/400x240?text=No+Image"}
            alt={recipe.title || "Recipe"}
            style={{ width: "100%", maxWidth: "420px", borderRadius: "10px", border: "1px solid #dbe2ef" }}
          />
        </div>
      </div>
    </div>
  );
}

export default RecipeView;
