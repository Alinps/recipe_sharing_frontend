import styles from "./RecipeDetailsSkeleton.module.css";

function RecipeDetailsSkeleton() {
  return (
    <div className={styles.container}>
      {/* Image */}
      <div className={styles.image}></div>

      {/* Title */}
      <div className={styles.title}></div>

      {/* Chef */}
      <div className={styles.sub}></div>

      {/* Description lines */}
      <div className={styles.text}></div>
      <div className={styles.text}></div>
      <div className={styles.textShort}></div>
    </div>
  );
}

export default RecipeDetailsSkeleton;