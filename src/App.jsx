import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Home from "./Pages/Home";
import Jobs from "./Pages/Jobs";
import Jobdetails from "./Pages/Jobdetails";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Applyjob from "./Pages/Applyjob";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<Jobdetails />} />
        <Route path="/apply/:id" element={<Applyjob />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;