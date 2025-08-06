import React from 'react'
import useFetch from '../hooks/useFetch.js'

function Location({url, onBack, handleAreaBtn}) {
    const [location, loading, error] = useFetch(url);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div>
            {loading && <p>Loading location details...</p>}
            {error && <p>Error loading details: {error}</p>}

            {location && (
                <div>
                    <h3>{location.name}({location.region?.name || 'Unknown'})</h3>
                    <p>Areas:</p>
                    <ul className='areas-list'>
                        {
                            location.areas.map((area) => (
                                <li key={area.name}><button onClick={() => handleAreaBtn(area.url)}>{area.name}</button></li>
                            ))
                        }
                    </ul>
                </div>
            )}
            <button onClick={() => onBack('locationsPage')}>Back</button>
        </div>
  )
}

export default Location