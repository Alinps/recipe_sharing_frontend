import { useState } from "react";
import styles from "./CreateRecipe.module.css";
import API from "../../services/api";
import { useToast } from "../../context/ToastContext";

function CreateRecipe() {

  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    steps: "",
    difficulty_level: "Easy",
    description:"",
    cooking_time: "",
    image: null
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };

  const handleImage = (e) => {

    setFormData({
      ...formData,
      image: e.target.files[0]
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const data = new FormData();

    data.append("title", formData.title);
    data.append("ingredients", formData.ingredients);
    data.append("steps", formData.steps);
    data.append("difficulty_level", formData.difficulty_level);
    data.append("cooking_time", formData.cooking_time);
    data.append("description",formData.description);
    data.append("image", formData.image);

    try {

      await API.post("create/", data);

      showToast("Recipe created successfully!", "success");

      setFormData({
        title: "",
        ingredients: "",
        steps: "",
        difficulty_level: "Easy",
        cooking_time: "",
        description:"",
        image: null
      });

    } catch (error) {

      showToast("Failed to create recipe", "error");

    }

  };

  return (

    <div className="container">

      <div className={styles.wrapper}>

        <div className={styles.card}>

          <h2 className={styles.title}>
            Add New Recipe
          </h2>

          <form onSubmit={handleSubmit} className={styles.form}>

            <div className={styles.field}>
              <label>Recipe Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label>About Recipe</label>
              <input
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label>Ingredients</label>
              <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label>Steps</label>
              <textarea
                name="steps"
                value={formData.steps}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label>Cooking Time</label>
              <input
                name="cooking_time"
                value={formData.cooking_time}
                onChange={handleChange}
                placeholder="e.g. 30min"
              />
            </div>

            <div className={styles.field}>
              <label>Difficulty Level</label>

              <select
                name="difficulty_level"
                value={formData.difficulty_level}
                onChange={handleChange}
              >

                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>

              </select>

            </div>

            <div className={styles.field}>
              <label>Recipe Image</label>
              <input
                type="file"
                onChange={handleImage}
                accept="image/*"
              />
            </div>

            <button className="btn">
              Create Recipe
            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default CreateRecipe;