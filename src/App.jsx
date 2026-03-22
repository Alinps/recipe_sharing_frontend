import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Recipes from "./pages/Recipes/Recipes";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails";
import CreateRecipe from "./pages/CreateRecipe/CreateRecipe";
import Profile from "./pages/Profile/Profile";
import EditRecipe from "./pages/EditRecipe/EditRecipe";
import { Route,Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute"; 
import PublicRoute from "./components/PublicRoute";
import ProfileEdit from "./pages/ProfileEdit/ProfileEdit";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import Landing from "./pages/Landing/Landing";
import { useLocation } from "react-router-dom";
function App() {
   const location = useLocation();
  
const isLanding = location.pathname === "/";
  const hideNavbar = location.pathname === "/";
  return (
    <>
        {!hideNavbar && <Navbar />}
          {isLanding ? (
        <Landing />
      ):(
      <main className="page">

        <Routes>

          <Route 
                path="/" 
                element={
                      
                          <Landing />
                       
                      } />

          
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
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />

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

          <Route 
                path="/edit/recipe/:id" 
                element={
                <ProtectedRoute>
                  <EditRecipe />
                </ProtectedRoute>
              } />

             <Route 
                path="/edit/profile" 
                element={
                <ProtectedRoute>
                  <ProfileEdit />
                </ProtectedRoute>
              } />


              <Route
                path="/changepassword" 
                element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              } />

        </Routes>
        

      </main>
      )}
      
    </>
  );
}

export default App;