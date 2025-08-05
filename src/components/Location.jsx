import React from 'react'
import useFetch from '../hooks/useFetch.js'

function Location({url, onBack}) {
    const [location, loading, error] = useFetch(url);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div>
            {loading && <p>Loading location details...</p>}
            {error && <p>Error loading details: {error}</p>}

            {location && (
                <div>
                    <h3>Selected Location: {location.name}</h3>
                    <p>ID: {location.id}</p>
                    <p>Region: {location.region?.name || 'Unknown'}</p>
                    <p>Areas: {location.areas?.length || 0}</p>
                </div>
            )}
            <button onClick={onBack}>Back</button>
        </div>
  )
}

export default Location