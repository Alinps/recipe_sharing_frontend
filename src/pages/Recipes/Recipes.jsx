import { useState, useEffect } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import styles from "./Recipes.module.css";
import API from "../../services/api";


function Recipes() {

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 25;


  useEffect(() => {
    const fetchRecipes = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
      try {
        const res = await API.get(`list/?limit=${LIMIT}&offset=${offset}`);
        setRecipes((prev) => [...prev, ...res.data.results]);

      if (!res.data.next) {
        setHasMore(false);
      }
      setOffset((prev) => prev + LIMIT);
      } catch (err) {
        setError("Failed to load recipes");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // When user is near bottom
      if (scrollTop + windowHeight >= fullHeight - 100) {
        fetchRecipes();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset, hasMore, loading]);


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
           {loading && <p>Loading...</p>}
           {!hasMore && <p>No more recipes</p>}
        </div>
      </section>

    </div>

  );

}

export default Recipes;