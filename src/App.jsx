import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Recipes from "./pages/Recipes/Recipes";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails";
import CreateRecipe from "./pages/CreateRecipe/CreateRecipe";
import Profile from "./pages/Profile/Profile";
import { Route,Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute"; 
import PublicRoute from "./components/PublicRoute";
function App() {
  return (
    <>
      <Navbar />
      <main className="page">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
                path="/login" 
                element={
                        <PublicRoute>
                          <Login />
                        </PublicRoute>
                      } />
          <Route 
                path="/register" 
                element={
                        <PublicRoute>
                          <Register />
                        </PublicRoute>} 
                        />


          <Route 
                path="/recipes" 
                element={
                <ProtectedRoute>
                  <Recipes />
                </ProtectedRoute>
              }/>

          <Route 
                path="/recipes/:id" 
                element={
                  <ProtectedRoute>
                    <RecipeDetails />
                  </ProtectedRoute>
                  }/>
          <Route 
                path="/add-recipe" 
                element={
                <ProtectedRoute>
                  <CreateRecipe />
                </ProtectedRoute> 
                }/> 
          <Route 
                path="/profile/:id" 
                element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
        </Routes>

      </main>
    </>
  );
}

export default App;