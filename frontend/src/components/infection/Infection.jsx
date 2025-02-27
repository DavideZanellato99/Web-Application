import React from "react";
import { Link } from "react-router-dom";
import './Infection.css';

export default function Infection({ infections }) {
    // Funzione per trasformare il valore in minuscolo con trattini al posto degli spazi
    const formatLink = (text) => {
        return text.toLowerCase().replace(/\s+/g, '-');
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                {infections.map((infection, index) => (
                    <div className="col-md-4 col-sm-6 col-12 mb-4" key={index}>
                        <Link to={`/le-infezioni/${formatLink(infection.value)}`} className="infection-link" tabIndex="0">
                            <div className="infection-component">
                                <h5>{infection.value}</h5>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
