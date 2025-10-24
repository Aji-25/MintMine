import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="homepage-container">
      <div className="hero-section">
        <h1 className="hero-title">
          Mine the Future of <span className="hero-highlight">NFTs</span>
        </h1>
        <p className="hero-subtitle">
          Mint, collect, and trade digital treasures with true ownership on the Internet Computer.
        </p>
        <div className="hero-buttons">
          <Link to="/minter">
            <button className="btn-primary">Mint Now</button>
          </Link>
          <Link to="/discover">
            <button className="btn-secondary">Explore Marketplace</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
