import { Routes, Route } from "react-router";
import Home from "./pages/Webstie/Home";
import Article from "./pages/Webstie/Article";
import "./index.css"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/article" element={<Article />} />{" "}
    </Routes>
  );
}

export default App;
