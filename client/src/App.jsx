import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Home from "./Views/Home/home.jsx";
import Detail from "./Views/Detail/detail.jsx";
import Create from "./Views/Create/create.jsx";
import Landing from "./Views/Landing/landingPage.jsx";
import About from "./Views/About/about.jsx";
import NavBar from "./Components/NavBar/navBar.jsx";

import "./App.css";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create-activity" element={<Create />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
