import { Link } from "react-router-dom";
import styles from "./RecipeCard.module.css";

function RecipeCard({ id, title, chef, image }) {

  const BASE_URL = "https://recipe-sharing-platform-o4zt.onrender.com";

  const imageUrl = image?.startsWith("http")
    ? image
    : `${BASE_URL}${image}`;

  return (

    <div className={styles.card}>

      <div className={styles.imageWrapper}>

        <img
          src={imageUrl}
          alt={title}
          className={styles.image}
        />

        <div className={styles.overlay}>

          <h3 className={styles.title}>
            {title}
          </h3>

          <p className={styles.chef}>
            By {chef}
          </p>

          {id && (
            <Link
              to={`/recipes/${id}`}
              className={styles.button}
            >
              View Recipe
            </Link>
          )}

        </div>

      </div>

    </div>

  );

}

export default RecipeCard;