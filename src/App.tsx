import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import CreatePost from "./pages/createPost/CreatePost";

function App() {
  return (
    <div className="">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="*" element={<h1>THIS PAGE DOES NOT EXIST</h1>} />
        </Routes>
     </Router>
    </div>
  );
}

export default App;
