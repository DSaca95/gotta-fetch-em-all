import React from "react";
import "../styles/Locations.css";

const Locations = ({data, loading, error, handleClick}) => {
    const locationsData = data ? data.results : [];

    if (loading) return <p className="locations-loading">Loading...</p>
    if (error) return <p className="locations-error">Error: {error}</p>

    return(
        <div id="locations">
            {
                locationsData.map((location, index) => {
                    return <div key={index}>
                        <h2>{location.name} 🏞️</h2>
                        <button onClick={() => handleClick(location.url)}>Go to location ➡️</button>
                    </div>
                })
            }
        </div>
    );
}

export default Locations;