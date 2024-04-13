import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ThemeContextProvider from "./context/ThemeContext";
import Home from "./pages/Home/Home";
import Shirts from "./pages/Shirts/Shirts";
import Hoodies from "./pages/Hoodies/Hoodies";
import Pants from "./pages/Pants/Pants";
import Shorts from "./pages/Shorts/Shorts";
import Collection from "./pages/Collection/Collection";

function App() {
  return (
    <>
      <Navbar />
      <ThemeContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection/:name" element={<Collection />} />
          {/* <Route path="/shirts" element={<Shirts />} />
          <Route path="/hoodies" element={<Hoodies />} />
          <Route path="/pants" element={<Pants />} />
          <Route path="/shorts" element={<Shorts />} /> */}
        </Routes>
      </ThemeContextProvider>
    </>
  );
}

export default App;