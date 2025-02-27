import React from "react";

export default function TeamMembers({ name, role }) {
    return (
        <div className="team-member mx-2 mb-2 p-2 rounded">
            <h6 className="fw-bold">{name}</h6>
            <p className="text-muted">{role}</p>
        </div>
    );
}
