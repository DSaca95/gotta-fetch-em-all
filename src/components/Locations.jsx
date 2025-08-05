import React from "react";

const Locations = ({data, loading, error, handleClick}) => {
    const locationsData = data ? data.results : [];

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    return(
        <div id="locations">
            <h2>All Locations:</h2>
            {
                locationsData.map((location, index) => {
                    return <div key={index}>
                        <h2>{location.name}</h2>
                        <button onClick={() => handleClick(location.url)}>Go to location</button>
                    </div>
                })
            }
        </div>
    );
}

export default Locations;