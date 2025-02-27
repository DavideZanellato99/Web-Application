import React from "react";
import TeamMembers from "../teamMembers/TeamMembers";

export default function Team({ value, members }) {
    return (
        <div className="container-fluid" tabIndex="0">
            <div className="row">
                <div className="col-12 mb-4">
                    <div className="team-component border p-3 rounded shadow-sm pb-0">
                        <h4 className="mb-3">{value ? value : "Nome del team non disponibile"}</h4>
                        <div className="team-members">
                            {members && members.length > 0 ? (
                                <div className="row">
                                    {members.map((member, index) => (
                                        <div key={index} className="col-md-4 pb-0">
                                            <TeamMembers name={member.name} role={member.role} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>Nessun membro trovato</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
