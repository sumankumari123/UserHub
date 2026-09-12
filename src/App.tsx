import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import CreateUser from "./components/CreateUser";
import Navbar from "./components/Navbar";
import AllPosts from "./components/AllPosts";

function App() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<CreateUser />} />
          <Route path="/posts" element={<AllPosts />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
