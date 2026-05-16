import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../../../services/api";
import { useToast } from "../../../context/useToast";
import styles from "./AdminTable.module.css";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [previousPageUrl, setPreviousPageUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [debounceSearch, setDebounceSearch] = useState("");
  const { id } = useParams();
  const { showToast } = useToast();

  useEffect(() => {
    let isMounted = true;

    const fetchRecipes = async (userId, page = 1) => {
      try {
        const response = await API.get(`/user_admin/listrecipe/${userId}`, {
          params: {
            page,
            search: debounceSearch,
          },
        });

        if (isMounted) {
          const results = response.data.results || [];
          setRecipes(results);
          setTotalRecipes(response.data.count || 0);
          setNextPageUrl(response.data.next || null);
          setPreviousPageUrl(response.data.previous || null);

          if (results.length > 0 && page === 1) {
            setPageSize(results.length);
          }
        }
      } catch (error) {
        let message = "Faild to fetch Recipes";

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
      }
    };

    fetchRecipes(id, currentPage);

    return () => {
      isMounted = false;
    };
  }, [id, currentPage, debounceSearch, showToast]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const totalPages = totalRecipes > 0 ? Math.ceil(totalRecipes / pageSize) : 1;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h5 className={styles.title}>Recipe List</h5>
          <span className={styles.badge}>{totalRecipes} Recipes</span>
        </div>

        <div className={styles.searchWrap}>
          <input
            type="text"
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or ingredients"
          />
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Recipe Image</th>
                <th>Title</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {recipes.length === 0 ? (
                <tr>
                  <td colSpan="4" className={styles.empty}>
                    No Recipes Found
                  </td>
                </tr>
              ) : (
                recipes.map((recipe) => (
                  <tr key={recipe.id}>
                    <td>
                      <img
                        src={recipe.image ? `${recipe.image}` : "https://via.placeholder.com/50"}
                        alt="Recipe"
                        className={styles.avatar}
                      />
                    </td>
                    <td>{recipe.title || "No title"}</td>
                    <td>{recipe.created_at || "Not available"}</td>
                    <td>
                      <div className={styles.actions}>
                        <button className={`${styles.btn} ${styles.btnInfo}`}>View</button>
                        <button className={`${styles.btn} ${styles.btnDanger}`}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.footer}>
          <small className={styles.pageText}>
            Page {currentPage} of {totalPages}
          </small>

          <div className={styles.pagination}>
            <button
              className={`${styles.btn} ${styles.btnOutline}`}
              disabled={!previousPageUrl}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </button>
            <button
              className={`${styles.btn} ${styles.btnOutline}`}
              disabled={!nextPageUrl}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeList;
