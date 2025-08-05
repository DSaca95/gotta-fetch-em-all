import React, { useState } from "react";
import useFetch from "../hooks/useFetch.js";
import "../styles/Location.css";

const Location = () => {
    const {data, loading, error} = useFetch('https://pokeapi.co/api/v2/location');
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedLocationUrl, setSelectedLocationUrl] = useState(null);

    const locationsData = data ? data.results : [];
    
    const {data: locationDetails, loading: locationLoading, error: locationError} = useFetch(selectedLocationUrl);

    const handleLocationBtn = (location) => {
        setSelectedLocation(location);
        setSelectedLocationUrl(location.url);
    };

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    return(
        <div id="locations">
            {selectedLocation && (
                <div>
                    <h3>Selected Location: {selectedLocation.name}</h3>
                    {locationLoading && <p>Loading location details...</p>}
                    {locationError && <p>Error loading details: {locationError}</p>}
                    {locationDetails && (
                        <div>
                            <p>ID: {locationDetails.id}</p>
                            <p>Region: {locationDetails.region?.name || 'Unknown'}</p>
                            <p>Areas: {locationDetails.areas?.length || 0}</p>
                        </div>
                    )}
                    <button onClick={() => setSelectedLocation(null)}>Close Details</button>
                </div>
            )}
            
            <h1>All Locations:</h1>
            {
                locationsData.map((location, index) => {
                    return <div key={index}>
                        <h2>{location.name}</h2>
                        <button onClick={() => handleLocationBtn(location)}>Go to location</button>
                    </div>
                })
            }
        </div>
    );
}

export default Location;