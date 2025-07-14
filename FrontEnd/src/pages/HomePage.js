// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function HomePage() {
    return (
        <div className="home-page-container">
            <h2>Welcome to Modern Bank!</h2>
            <p>Please log in to access the system:</p>
            <nav className="home-page-nav">
                <Link to="/login" className="button">Login</Link>
            </nav>
        </div>
    );
}

export default HomePage;