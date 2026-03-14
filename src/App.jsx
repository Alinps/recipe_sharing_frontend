import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile";
import CreateRecipe from "./pages/CreateRecipe";
import RecipeDetails from "./pages/RecipeDetails";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/add-recipe" element={<CreateRecipe />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

    </div>
  );
}

export default App;