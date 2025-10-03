import React from 'react';
import {MapContainer as LeafletMapContainer, Marker, TileLayer, Popup} from "react-leaflet"
import L from "leaflet"
import 'leaflet/dist/leaflet.css';


const shipIcon = L.divIcon({
    html: '<div style="font-size: 30px;">🔴</div>',
    className: 'custom-marker',
    iconSize: [5, 5],
    iconAnchor: [10, 10]
})

export const MapContainerComponent = (props) => {

    const {ships} = props

    return (

        <React.Fragment>

            <div style={{height: '100%', width: '100%'}}>
                <LeafletMapContainer
                    center={[41.0082, 28.9784]}
                    zoom={7}
                    style={{height: '550px', width: '100%'}}
                >

                    <TileLayer
                        attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />

                    {ships.map((ship, index) => (
                        <Marker
                            key={index}
                            position={[ship.Latitude, ship.Longitude]}
                            icon={shipIcon}

                        >

                            <Popup
                                style={{width: 500}}>
                                <div>
                                    <p><strong>Gemi Adı:</strong> {ship.Name}</p>
                                    <p><strong>MMSI:</strong> {ship.MMSI}</p>
                                    <p><strong>Enlem:</strong> {ship.Latitude} K</p>
                                    <p><strong>Boylam:</strong> {ship.Longitude} D</p>
                                    <p><strong>Sürat:</strong> {ship.Speed} KTS</p>
                                    <p><strong>Rota:</strong> {ship.Course} </p>
                                </div>

                            </Popup>

                        </Marker>
                    ))}

                </LeafletMapContainer>
            </div>
        </React.Fragment>

    )

}

