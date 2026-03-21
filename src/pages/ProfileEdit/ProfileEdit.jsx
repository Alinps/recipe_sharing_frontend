import { useEffect, useState } from "react";
import API from "../../services/api";
import styles from "./ProfileEdit.module.css";
import { useToast } from "../../context/ToastContext";

function ProfileEdit() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    image: "",
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
const { showToast } = useToast();
    const BASE_URL =  "http://127.0.0.1:8000/"

  //Fetch Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("profile/edit/");
        setUser(res.data);
        setPreview(res.data.image);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  //Handle input change
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  //Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setUser({ ...user, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Update Profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);

      if (user.image instanceof File) {
        formData.append("image", user.image);
      }

      const res = await API.patch("profile/edit/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      setMessage("Profile updated successfully");
      setUser(res.data);
      showToast("Profile updated successfully");
    } catch (err) {
      showToast("Update failed","error");
      setMessage("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className={styles.wrapper}>
  <div className={styles.card}>
    <h2 className={styles.title}>My Profile</h2>

    <form onSubmit={handleSubmit} className={styles.form}>

      {/* PROFILE IMAGE */}
      <div className={styles.profileImageWrapper}>
        <img src={preview? `${BASE_URL}/${preview}`: `${BASE_URL}/media/profile-pic.png`} alt="profile" />
      </div>

      <div className={styles.fileInput}>
        <input type="file" onChange={handleImageChange} />
      </div>

      {/* NAME */}
      <div className={styles.field}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
      </div>

      {/* EMAIL */}
      <div className={styles.field}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
      </div>

      {/* BUTTON */}
      <button className={styles.submitBtn} disabled={loading}>
        {loading && <span className={styles.spinner}></span>}
        {loading ? "Updating..." : "Update Profile"}
      </button>

      {/* MESSAGE */}
      {/* {message && <p className={styles.message}>{message}</p>} */}

    </form>
  </div>
</div>
  );
}

export default ProfileEdit;