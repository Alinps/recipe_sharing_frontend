import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../services/api";
import { useToast } from "../../../context/useToast";
import styles from "./RecipeView.module.css";

function RecipeView() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
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

  const formatDate = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h5 className={styles.title}>Recipe Details</h5>
          </div>
          <div className={styles.state}>Loading recipe...</div>
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
          <div className={styles.state}>Recipe not found.</div>
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

        <div className={styles.content}>
          <div>
            <div className={styles.media}>
              <img
                src={recipe.image || "https://via.placeholder.com/600x400?text=No+Image"}
                alt={recipe.title || "Recipe"}
                className={styles.image}
              />
            </div>

            <div className={styles.meta}>
              <span className={styles.chip}>Time: {recipe.cooking_time || "N/A"}</span>
              <span className={styles.chip}>Difficulty: {recipe.difficulty_level || "N/A"}</span>
              <span className={styles.chip}>Created: {formatDate(recipe.created_at) || "N/A"}</span>
              <span className={styles.chip}>User ID: {recipe.user ?? "N/A"}</span>
            </div>
          </div>

          <div>
            <section className={styles.section}>
              <h6 className={styles.sectionTitle}>Description</h6>
              <p className={styles.text}>{recipe.description || "Not available"}</p>
            </section>

            <section className={styles.section}>
              <h6 className={styles.sectionTitle}>Ingredients</h6>
              <p className={styles.text}>{recipe.ingredients || "Not available"}</p>
            </section>

            <section className={styles.section}>
              <h6 className={styles.sectionTitle}>Instructions</h6>
              <p className={styles.text}>{recipe.steps || "Not available"}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeView;
