import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import styles from "./RecipeDetails.module.css";
import { useToast } from "../../context/ToastContext";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import RecipeDetailsSkeleton from "../../components/RecipeDetailsSkeleton/RecipeDetailsSkeleton";

function RecipeDetails() {

  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
 

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await API.get(`recipedetails/${id}`);
        setRecipe(response.data.data);
        setIsSaved(response.data.data.is_saved);
      } catch (err) {
        setError("Failed to load recipe");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleWishlistToggle = async () => {
  try {
    const res = await API.post("wishlist/toggle/", {
      recipe_id: recipe.id,
    });

    if (res.data.status === "added") {
      setIsSaved(true);
      showToast("Added to wishlist ❤️");
    } else {
      setIsSaved(false);
      showToast("Removed from wishlist");
    }

  } catch (error) {
   let message = "Something went wrong";
      if (error.response?.data){
        const data = error.response.data;

        if (data.error){
          message = data.error;
        } else {
          // handle field errors
          const firstKey = object.keys(data)[0];
          message = data[firstKey][0];
        }
      }
      showToast(message, "error");
  }
};



const handleDelete = async () => {
  const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
  if (!confirmDelete) return;
  try {
    await API.delete(`delete/${recipe.id}`);
    showToast("Recipe deleted successfully");
    navigate("/"); // or profile page
  } catch (error) {
    let message = "Failed to delete recipe";
      if (error.response?.data){
        const data = error.response.data;

        if (data.error){
          message = data.error;
        } else {
          // handle field errors
          const firstKey = object.keys(data)[0];
          message = data[firstKey][0];
        }
      }
      showToast(message, "error");
  }
};


  if (loading) return <RecipeDetailsSkeleton />;
  if (error) return <p>{error}</p>;

  return (

    <div className="container">
      <div className={styles.wrapper}>
        {/* Image */}
        <div className={styles.imageSection}>
          <img
            src={recipe.image}
            alt={recipe.title}
          />

          </div>


        {/* Content */}
        <div className={styles.content}>
          <h1 className={styles.title}>
            {recipe.title}
            <div className={styles.saveWrapper}>
              <button
                className={styles.saveBtn}
                onClick={handleWishlistToggle}
              >{isSaved ? <FaBookmark /> : <FaRegBookmark />}
              </button>
              <span className={styles.tooltip}>{isSaved ? "Saved" : "Save"}</span>
            </div>
            <div className={styles.saveWrapper}>
            {user?.id === recipe.user.id &&(
                <button className={styles.deleteIcon} onClick={handleDelete}><FaTrash /></button>
              )}
              <span className={styles.tooltip}>Delete</span>
              </div>
              <div className={styles.saveWrapper}>
               {user?.id === recipe.user.id &&(
               <button className={styles.editIconBtn} onClick={() => navigate(`/edit/recipe/${recipe.id}`)}><FiEdit /></button>
              )}
              <span className={styles.tooltip}>Edit</span>
              </div>
          </h1>
          <div className={styles.section}>
            <p>{recipe.description}</p>
          </div>
          
     
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