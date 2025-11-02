import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./public/css/App.css";
// import "./public/js/myapp.js"
import Home from "./components/Home";
import Add from "./components/Add";
import Edit from "./components/Edit";
import Single from "./components/Single";
import Navbar from "./includes/Navbar";
import Footer from "./includes/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";

const App = () => {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/detail/:id" element={<Single />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
  );
};
export default App;