import styles from "./Hero.module.css";

function Hero() {

  return (

    <section className={styles.hero}>

      <div className="container">

        <div className={styles.heroContent}>

          <h1 className={styles.title}>
            Discover & Share
            <span> Amazing Recipes</span>
          </h1>

          <p className={styles.subtitle}>
            Explore delicious dishes from chefs around the world
            or share your own culinary creations.
          </p>

          <div className={styles.actions}>

            <a href="/recipes" className="btn">
              Browse Recipes
            </a>

            <a href="/add-recipe" className={styles.secondaryBtn}>
              Share Recipe
            </a>

          </div>

        </div>

      </div>

    </section>

  );

}

export default Hero;