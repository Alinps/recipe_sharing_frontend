import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import API from "../../services/api";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { Link, useParams } from "react-router-dom";

function Profile() {

  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [activeTab, setActiveTab] = useState("recipes");
  const [wishlistLoaded, setWishlistLoaded] = useState(false);
  const [loading, setLoading] = useState(true);


   
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get(`profile/${id}/`);
        setUser(response.data);
        
      } catch (error) {
        console.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);


  const handleWishlistClick = async () => {
    setActiveTab("wishlist");

    if (!wishlistLoaded) {
      try {
        const res = await API.get(`profile/${id}/wishlist/`);
        setWishlist(res.data);
        setWishlistLoaded(true);
      } catch (error) {
        
        let message = "Failed to load wishlist";
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
      console.error(message);
      showToast(message, "error");
      }
    }
  };

  if (loading) return <p className={styles.message}>Loading profile...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>

        <img
          src={user.image|| "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"}
          className={styles.avatar}
          alt="profile"
        />

        <div className={styles.info}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>

          <div className={styles.stats}>
            <span><strong>{user.recipes.length}</strong> Recipes</span>
            <span><strong>{wishlist.length}</strong> Wishlist</span>
          </div>
          <Link to="/edit/profile" className={styles.editBtn} >Edit</Link>
          <Link to="/changepassword" className={styles.editBtn} >Change Password</Link>
          
        </div>
      </div>


      <div className={styles.tabs}>
        <button
        
          className={activeTab === "recipes" ? styles.active : ""}
          onClick={() => setActiveTab("recipes")}
        >
          Recipes
        </button>

        <button
        
          className={ activeTab === "wishlist" ? styles.active : ""}
          onClick={handleWishlistClick}
        >
          Wishlist
        </button>
      </div>


      <div className={styles.grid}>
        {activeTab === "recipes" &&
          user.recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              {...recipe}
              chef={user.name}
            />
          ))}

        {activeTab === "wishlist" &&
          wishlist.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              {...recipe}
            />
          ))}
      </div>
    </div>
  );
}

export default Profile;