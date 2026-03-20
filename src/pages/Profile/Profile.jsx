import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import API from "../../services/api";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { useParams } from "react-router-dom";

function Profile() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const BASE_URL = "http://127.0.0.1:8000";

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const response = await API.get(`profile/${id}/`);
        console.log(response.data)
        setUser(response.data);

      } catch (error) {

        console.error("Failed to load profile");

      } finally {

        setLoading(false);

      }

    };

    fetchProfile();

  }, []);

  if (loading) return <p className={styles.message}>Loading profile...</p>;

  return (

    <div className="container">

      {/* User Info */}

      <div className={styles.profileCard}>

        <h1 className={styles.name}>{user.name}</h1>

        <p className={styles.email}>{user.email}</p>

      </div>


      {/* User Recipes */}

      <div className={styles.recipeSection}>

        <h2 className={styles.sectionTitle}>
          My Recipes
        </h2>

        <div className={styles.grid}>

          {user.recipes.map((recipe) => (

            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              chef={user.name}
              image={recipe.image}
            />

          ))}

        </div>

      </div>

    </div>

  );

}

export default Profile;