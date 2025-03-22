import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Article from "./pages/Article";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/article" element={<Article />} />{" "}
    </Routes>
  );
}

export default App;
