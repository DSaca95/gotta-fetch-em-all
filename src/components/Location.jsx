import React from 'react'
import useFetch from '../hooks/useFetch.js'
import '../styles/Location.css'

function Location({url, onBack, handleAreaBtn}) {
    const [location, loading, error] = useFetch(url);

    if (loading) return <p className="location-loading">Loading...</p>
    if (error) return <p className="location-error">Error: {error}</p>

    return (
        <div className="location-container">
            {loading && <p className="location-loading">Loading location details...</p>}
            {error && <p className="location-error">Error loading details: {error}</p>}

            {location && (
                <div>
                    <div className="location-header">
                        <h3>{location.name}</h3>
                        <div className="location-region">({location.region?.name || 'Unknown region'})</div>
                    </div>
                    
                    <div className="areas-section">
                        <p>Available Areas:</p>
                        <ul className='areas-list'>
                            {
                                location.areas.map((area) => (
                                    <li key={area.name}>
                                        <button onClick={() => handleAreaBtn(area.url)}>{area.name} 🏞️</button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            )}
            <button className="back-button" onClick={() => onBack('locationsPage')}>Back to Locations ⬅️</button>
        </div>
  )
}

export default Location