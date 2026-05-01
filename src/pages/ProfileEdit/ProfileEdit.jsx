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

      const res = await API.patch("profile/edit/", formData);
      

      setUser(res.data);
      setPreview(res.data.image);
      showToast("Profile updated successfully");
    } catch (error) {

      let message = "Update failed";
      if (error.response?.data){
        const data = error.response.data;

        if (data.error){
          message = data.error;
        } else {
          const firstKey = Object.keys(data)[0];
          const value = data[firstKey];

          message = Array.isArray(value) ? value[0] : value;
    }
  }
      showToast(message, "error");
      setMessage(message);

    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  return () => {
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
  };
}, [preview]);

  return (
   <div className={styles.wrapper}>
  <div className={styles.card}>
    <h2 className={styles.title}>My Profile</h2>

    <form onSubmit={handleSubmit} className={styles.form}>

      {/* PROFILE IMAGE */}
      <div className={styles.profileImageWrapper}>
        <img src={preview || 
          "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"}
           alt="profile" />
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