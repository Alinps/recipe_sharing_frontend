import Hero from "../../components/Hero/Hero";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

function Home() {

  return (

    <>

      <Hero />

      <div className="container">

        <section className="section">

          <h2>Featured Recipes</h2>

          <div className="recipeGrid">

            <RecipeCard
              title="Spaghetti Carbonara"
              image="https://images.unsplash.com/photo-1603133872878-684f208fb84b"
              chef="Chef Marco"
            />

            <RecipeCard
              title="Grilled Steak"
              image="https://images.unsplash.com/photo-1551183053-bf91a1d81141"
              chef="Chef John"
            />

            <RecipeCard
              title="Classic Burger"
              image="https://images.unsplash.com/photo-1550547660-d9450f859349"
              chef="Chef Anna"
            />

          </div>

        </section>

      </div>

    </>

  );

}

export default Home;