import styles from "./SkeletonCard.module.css";

function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={styles.image}></div>
      <div className={styles.text}></div>
      <div className={styles.subtext}></div>
    </div>
  );
}

export default SkeletonCard;