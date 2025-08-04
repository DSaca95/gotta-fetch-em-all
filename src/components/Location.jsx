import React from "react";

export default function Location({name, onClick}) {
    return (
        <div>
            <h2>{name}</h2>
            <button onClick={onClick}>Loc</button>
        </div>
    )
}