import './App.css';
// FFS
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./pages/User"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:username" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
