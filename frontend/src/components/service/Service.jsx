import React from "react";
import { Link } from "react-router-dom";

export default function Service({ value, link }) {

    const handleClick = () => {
        window.scrollTo(0, 0); // Scrolla all'inizio della pagina
    };

    return (
        <Link 
        to={link} 
        className="service-title-link text-center font-weight-bold text-decoration-none"  
        style={{ color: "inherit" }}
        onClick={handleClick} 
        >
            <h5 className="service-title">{value}</h5>
        </Link>
    );
}
