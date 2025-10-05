import React from 'react';
import {MapContainer as LeafletMapContainer, Marker, TileLayer, Popup, useMap} from "react-leaflet"
import L from "leaflet"
import 'leaflet/dist/leaflet.css';


const shipIcon = L.divIcon({
    html: '<div style="font-size: 12px">🔴</div>',
    className: 'custom-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
})

export const MapContainerComponent = (props) => {

    const {ships, markerRefs, mapRef} = props

    return (

        <React.Fragment>

            <div style={{height: '100%', width: '100%'}}>
                <LeafletMapContainer
                    center={[39.0000, 34.0000]}
                    zoom={6}
                    style={{height: '600px', width: '100%'}}
                    ref={mapRef}
                >

                    <TileLayer
                        attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />

                    {ships.map((ship, index) => (
                        <Marker
                            key={ship.MMSI}
                            position={[ship.Latitude, ship.Longitude]}
                            icon={shipIcon}
                            ref={data => {

                                markerRefs.current[ship.MMSI] = data

                            }}

                        >

                            <Popup
                                style={{width: 500}}>
                                <div>
                                    <p><strong>Gemi Adı:</strong> {ship.Name}</p>
                                    <p><strong>MMSI:</strong> {ship.MMSI}</p>
                                    <p><strong>Enlem:</strong> {ship.Latitude} K</p>
                                    <p><strong>Boylam:</strong> {ship.Longitude} D</p>
                                    <p><strong>Sürat:</strong> {ship.Speed} KTS</p>
                                    <p><strong>Rota:</strong> {ship.Course}° </p>
                                </div>

                            </Popup>

                        </Marker>
                    ))
                    }
                </LeafletMapContainer>
            </div>
        </React.Fragment>

    )

}

