import { useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';


const Navbar = () => {
  const [search, setSearch] = useState("");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">

        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
            UserHub
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link to="/"
            className="text-gray-700 font-medium hover:text-blue-600 transition"
          >
            Home
          </Link>

          <Link to="/posts"
            className="text-gray-700 font-medium hover:text-blue-600 transition"
          >
            All Posts
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 w-64 outline-none"
          />

          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


