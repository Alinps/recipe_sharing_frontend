import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";
import styles from "./EditRecipe.module.css";
import { useToast } from "../../context/ToastContext";

function EditRecipe() {

  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    description:"",
    steps: "",
    cooking_time: "",
    difficulty: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  // 🔹 Fetch existing recipe
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await API.get(`recipedetails/${id}`);
        const data = res.data.data;
        setFormData({
          title: data.title,
          ingredients: data.ingredients,
          steps: data.steps,
          cooking_time: data.cooking_time,
          difficulty: data.difficulty_level,
          description:data.description,
          image: null,
        });
        setPreview(`${data.image}`);
      } catch (err) {
         let message = "Failed to load";
        if (err.response?.data){
          const data = err.response.data;

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

    fetchRecipe();
  }, [id]);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Handle image
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setFormData({
      ...formData,
      image: file,
    });

    setPreview(URL.createObjectURL(file));
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
      setSubmitting(true);
    const data = new FormData();
    data.append("recipe_id", id);
    data.append("title", formData.title);
    data.append("ingredients", formData.ingredients);
    data.append("description",formData.description);
    data.append("steps", formData.steps);
    data.append("cooking_time", formData.cooking_time);
    data.append("difficulty", formData.difficulty);

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      await API.put("update/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showToast("Recipe updated successfully");
      navigate(`/recipes/${id}`);
    } catch (err) {
      let message = "Failed to load";
        if (err.response?.data){
          const data = err.response.data;

        if (data.error){
          message = data.error;
        } else {
          const firstKey = Object.keys(data)[0];
          const value = data[firstKey];

          message = Array.isArray(value) ? value[0] : value;
    }
  }
      showToast(message, "error");
    }finally {
    setSubmitting(false); 
  }
    
  };

  return (
   <div className={styles.wrapper}>
  <div className={styles.card}>

    <h2 className={styles.title}>Edit Recipe</h2>

    <form className={styles.form} onSubmit={handleSubmit}>

      {/* Image */}
      <div className={styles.imageWrapper}>
        <img src={preview} alt="preview" />
        <input type="file" onChange={handleImageChange} />
      </div>

      {/* Title */}
      <div className={styles.field}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>


        <div className={styles.field}>
        <label>About Recipe</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      {/* Ingredients */}
      <div className={styles.field}>
        <label>Ingredients</label>
        <textarea
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
        />
      </div>

      {/* Steps */}
      <div className={styles.field}>
        <label>Instructions</label>
        <textarea
          name="steps"
          value={formData.steps}
          onChange={handleChange}
        />
      </div>

      {/* Cooking Time */}
      <div className={styles.field}>
        <label>Cooking Time</label>
        <input
          type="text"
          name="cooking_time"
          value={formData.cooking_time}
          onChange={handleChange}
        />
      </div>

      {/* Difficulty */}
      <div className={styles.field}>
        <label>Difficulty</label>
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className={styles.submitBtn}
        disabled={submitting}
      >
        {submitting ? (
          <>
            <span className={styles.spinner}></span>
            Updating...
          </>
        ) : (
          "Update Recipe"
        )}
      </button>

    </form>
  </div>
</div>
  );
}

export default EditRecipe;