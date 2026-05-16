import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Recipes from "./pages/Recipes/Recipes";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails";
import CreateRecipe from "./pages/CreateRecipe/CreateRecipe";
import Profile from "./pages/Profile/Profile";
import EditRecipe from "./pages/EditRecipe/EditRecipe";
import { Route, Routes, useLocation, matchPath, Navigate  } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ProfileEdit from "./pages/ProfileEdit/ProfileEdit";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import Landing from "./pages/Landing/Landing";
import ServerWakeup from "./components/ServerWakeup/ServerWakeup";
import { useSelector } from "react-redux";

import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminPublicRoute from "./components/AdminPublicRoute";
import AdminLogin from "./pages/adminPages/AdminLogin/AdminLogin";
import UserList from "./pages/adminPages/AdminDashboard/UserList";
import RecipeList from "./pages/adminPages/AdminDashboard/RecipeList";
import AdminNavbar from "./pages/adminPages/AdminDashboard/AdminNavbar";
import RecipeView from "./pages/adminPages/AdminDashboard/RecipeView";

function App() {
  const location = useLocation();

  const noLayoutPaths = ["/", "/landing"];
  const adminPaths = [
    "/admin_login",
    "/admin/dashboard",
    "/admin/dashboard/recipelist/:id",
    "/admin/dashboard/recipeview/:id",
  ];

  const isNoLayout = noLayoutPaths.includes(location.pathname);
  const isAdminLayout = adminPaths.some((pattern) =>
    matchPath({ path: pattern, end: true }, location.pathname)
  );
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdminAuthenticated = useSelector((state) => state.adminAuth.isAdminAuthenticated);

  return (
    <>
      {!isNoLayout && !isAdminLayout && <Navbar />}

      {isNoLayout || isAdminLayout ? (
        <Routes>
          <Route
              path="/"
              element={
                isAdminAuthenticated ? (
                  <Navigate to="/admin/dashboard" replace />
                ) : isAuthenticated ? (
                  <Navigate to="/home" replace />
                ) : (
                  <ServerWakeup />
                )
              }
            />
          <Route path="/landing" element={<Landing />} />
          <Route
            path="/admin_login"
            element={
              <AdminPublicRoute>
                <AdminLogin />
              </AdminPublicRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminNavbar />
                <UserList />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard/recipelist/:id"
            element={
              <AdminProtectedRoute>
                <AdminNavbar />
                <RecipeList />
              </AdminProtectedRoute>
            }
          />


          <Route
            path="/admin/dashboard/recipeview/:id"
            element={
              <AdminProtectedRoute>
                <AdminNavbar />
                <RecipeView />
              </AdminProtectedRoute>
            }
          />


        </Routes>
      ) : (
        <main className="page">
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/recipes"
              element={
                <ProtectedRoute>
                  <Recipes />
                </ProtectedRoute>
              }
            />

            <Route
              path="/recipes/:id"
              element={
                <ProtectedRoute>
                  <RecipeDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/add-recipe"
              element={
                <ProtectedRoute>
                  <CreateRecipe />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile/:id"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit/recipe/:id"
              element={
                <ProtectedRoute>
                  <EditRecipe />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit/profile"
              element={
                <ProtectedRoute>
                  <ProfileEdit />
                </ProtectedRoute>
              }
            />

            <Route
              path="/changepassword"
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      )}
    </>
  );
}

export default App;
