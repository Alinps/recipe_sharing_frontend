import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import API from "../../services/api";
import { useToast } from "../../context/useToast";

function RecipeList(){

    const [recipes, setRecipes] = useState([]);
    const [totalRecipes, setTotalRecipes] = useState(0);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [previousPageUrl, setPreviousPageUrl] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState("");
    const [debounceSearch, setDebounceSearch] = useState("");
    const {id} = useParams();
    const { showToast } = useToast();


    useEffect(() => {

        let isMounted = true;

        const fetchRecipes = async (id,page=1) => {

        try {

            const response = await API.get(`/user_admin/listrecipe/${id}`,{
                params: {
                    page,
                    search:debounceSearch
                }
            });

            if (isMounted) {

                const results = response.data.results || [];
                setRecipes(results);
                setTotalRecipes(response.data.count || 0);
                setNextPageUrl(response.data.next || null);
                setPreviousPageUrl(response.data.previous || null);

                if(results.length > 0 && page ===1) {
                    setPageSize(results.length);
                }

            }
            
        } catch (error) {

            let message = "Faild to fetch Recipes"
            console.log(error);
            
            if (error.response?.data) {

                const data = error.response.data;

                if (data.error) {

                    message = data.error

                } else {

                    const firstKey = Object.keys(data)[0];
                    const value = data[firstKey];
                    message = Array.isArray(value) ? value[0] : value;

                }
            }

            showToast(message,"error");

        }
    }

    fetchRecipes(id,currentPage)

    return () => {
            isMounted = false;
        };

    },[id, currentPage, debounceSearch, showToast])


    useEffect(()=>{

        const timer = setTimeout(()=>{
            setDebounceSearch(search);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    },[search]);



    const totalPages = totalRecipes > 0 ? Math.ceil(totalRecipes / pageSize) : 1;
    
    return (

        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h5 className="mb-0 fw-semibold">Recipe List</h5>
                    <span className="badge bg-secondary">{totalRecipes} Recipes</span>
                </div>

                <div className="form-control d-flex justify-content-center">
                    <input type="text" value ={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search by title or ingredients" />
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle mb-0">
                        <thead className="table-dark">
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
                                    <td colSpan="5" className="text-center text-muted py-4">
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
                                                className="rounded-circle border"
                                                width="50"
                                                height="50"
                                                style={{ objectFit: "cover" }}
                                            />
                                        </td>
                                        <td className="fw-medium">{recipe.title || "No title"}</td>
                                        <td className="fw-medium">{recipe.created_at || "Not available"}</td>
                                        <td>
                                            <button className="btn btn-info">View</button>
                                            <button className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="card-footer bg-white d-flex justify-content-between align-items-center">
                     <small className="text-muted">
                        Page {currentPage} of {totalPages}
                    </small>

                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-outline-secondary"
                            disabled={!previousPageUrl}
                            onClick={() => setCurrentPage((prev) => Math.max(prev -1, 1))}
                            >
                                Previous
                        </button>
                        <button
                            className="btn btn-outline-secondary"
                            disabled={!nextPageUrl}
                            onClick={() => setCurrentPage((prev) => prev+1)}
                            >
                                Next
                        </button>
                    </div>
                
            </div>


        </div>
        </div>
    )


}

export default RecipeList