import { useState, useEffect } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import styles from "./Recipes.module.css";
import API from "../../services/api";
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [search, setSearch] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const LIMIT = 25;

  //  FETCH FUNCTION
  const fetchRecipes = async (reset = false) => {
    if (loading) return;
    if (!reset && !hasMore) return;

    setLoading(true);

    try {
      const currentOffset = reset ? 0 : offset;
      const query = search.trim();

      const res = await API.get(
        `list/?limit=${LIMIT}&offset=${currentOffset}&search=${query}`
      );

      if (reset) {
        setRecipes(res.data.results);
      } else {
        setRecipes((prev) => {
          const existingIds = new Set(prev.map((r) => r.id));
          const filtered = res.data.results.filter(
            (r) => !existingIds.has(r.id)
          );
          return [...prev, ...filtered];
        });
      }

      setHasMore(!!res.data.next);
      setOffset(currentOffset + LIMIT);
    } catch (err) {
      setError("Failed to load recipes");
    } finally {
      setLoading(false);
    }
  };

  //  INITIAL LOAD
  useEffect(() => {
    fetchRecipes();
    setIsFirstLoad(false);
  }, []);

  //  SCROLL HANDLER
  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= fullHeight - 100) {
        fetchRecipes();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, offset]);

  // SEARCH (DEBOUNCE + RESET)
  useEffect(() => {
    if (isFirstLoad) return;

    const delayDebounce = setTimeout(() => {
      setHasMore(true);
      fetchRecipes(true); // reset
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <div className="container">
      <section className="section">
        <h1 className={styles.title}>All Recipes</h1>

        {/*  SEARCH BAR */}
       <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search recipes..."
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

        {/*  ERROR */}
        {error && <p className={styles.error}>{error}</p>}

        {/*  GRID */}
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

           {/* Skeleton Loader */}
  {loading && recipes.length === 0 && (
  Array.from({ length: 6 }).map((_, index) => (
    <SkeletonCard key={index} />
  ))
)}

{loading && recipes.length > 0 && (
  <div className={styles.spinner}></div>
)}
        </div>



        {/*NO MORE DATA */}
        {!hasMore && !loading && (
          <p className={styles.message}>No more recipes</p>
        )}
      </section>
    </div>
  );
}

export default Recipes;