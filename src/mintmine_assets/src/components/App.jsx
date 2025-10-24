import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Minter from "./Minter";
import Header from "./Header";
import Footer from "./Footer";
import HomePage from "./HomePage";
import DiscoverPage from "./DiscoverPage";
import CollectionPage from "./CollectionPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/discover" element={<><DiscoverPage /><Footer /></>} />
          <Route path="/minter" element={<><Minter /><Footer /></>} />
          <Route path="/collection" element={<><CollectionPage /><Footer /></>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
