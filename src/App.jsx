import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Recipes from "./pages/Recipes/Recipes";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { Route,Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Navbar />
      <main className="page">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

      </main>
    </>
  );
}

export default App;