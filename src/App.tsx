import { Routes, Route } from "react-router";
import Home from "./pages/Webstie/Home";
import "./index.css"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
