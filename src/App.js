import "./Components/BookMarkList";
import Navbar from "./Components/Navbar";
import "./App.css";
import Footer from "./Components/Footer";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./Search";
import Login from "./Login";
import Signup from "./Signup";
import React, {useEffect} from "react";
import { createContext } from "react";
import UserProfile from "./UserProfile";


function App() {
  useEffect(() => {
    document.title = 'Bahnirc';
  }, []);

  return (
    
    <BrowserRouter>
      <div className="page">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/user" element={<UserProfile/>}/>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
