import React from 'react';
import {MapContainer as LeafletMapContainer, Marker, TileLayer, Popup, useMapEvents } from "react-leaflet"
import L from "leaflet"
import 'leaflet/dist/leaflet.css';
import { getAllShipsService} from "../../../services/ships";
import {SHIP_TYPE_ICONS} from "../../../helpers/ship-type-colors-helper"

const shipIcon = (shipType) => {
    const emoji = SHIP_TYPE_ICONS[shipType] || '🟤';
    return L.divIcon({
        html: `<div style="font-size: 9px">${emoji}</div>`,
        className: 'custom-marker',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
};

export const MapContainerComponent = (props) => {

    const {ships, markerRefs, mapRef,setShips} = props
    const getAllShips = (body) => {
        getAllShipsService({
            minLat: body.minLat,
            maxLat: body.maxLat,
            minLon: body.minLon,
            maxLon: body.maxLon,
            zoom: body.zoom
        }).then((res) => {
            console.log("res: ", res)
            // Eğer res direkt array ise:
            if (Array.isArray(res)) {
                setShips(res)
            } else {
                setShips([])  // Hata durumunda boş array
            }
        }).catch((err) => {
            console.error("Veri çekme hatası:", err)
            setShips([])  // Hata durumunda boş array
        })
    }

    function MapEventHandler({ onMapChange }) {
        const map = useMapEvents({
            moveend: () => {
                const center = map.getCenter();
                const bounds = map.getBounds();
                const zoom = map.getZoom();

                console.log('Zoom:', zoom);
                console.log('Center Lat:', center.lat, 'Lon:', center.lng);
                console.log('Bounds:', {
                    minLat: bounds.getSouth(),
                    maxLat: bounds.getNorth(),
                    minLon: bounds.getWest(),
                    maxLon: bounds.getEast()
                });

                getAllShips({
                    minLat: bounds.getSouth(),
                    maxLat: bounds.getNorth(),
                    minLon: bounds.getWest(),
                    maxLon: bounds.getEast(),
                    zoom: zoom
                })

                if (onMapChange) {
                    onMapChange({
                        zoom: zoom,
                        center: { lat: center.lat, lon: center.lng },
                        bounds: {
                            minLat: bounds.getSouth(),
                            maxLat: bounds.getNorth(),
                            minLon: bounds.getWest(),
                            maxLon: bounds.getEast()
                        }
                    });
                }
            }
        });

        return null;
    }


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

                    <MapEventHandler/>

                    {ships.map((ship, index) => (
                        <Marker
                            key={ship.MMSI}
                            position={[ship.Latitude, ship.Longitude]}
                            icon={shipIcon(ship.Type)}
                            ref={data => {

                                markerRefs.current[ship.MMSI] = data

                            }}

                        >
                            <Popup style={{width: 500}}>
                                <div style={{
                                    fontFamily: 'Arial, sans-serif',
                                    fontSize: '13px',
                                    lineHeight: '1.6'
                                }}>
                                    <h4 style={{
                                        margin: '0 0 10px 0',
                                        fontSize: '15px',
                                        color: '#2c3e50',
                                        borderBottom: '2px solid #3498db',
                                        paddingBottom: '5px'
                                    }}>
                                        {ship.Name}
                                    </h4>

                                    <div style={{display: 'grid', gridTemplateColumns: '80px 1fr', gap: '6px'}}>
                                        <span style={{color: '#7f8c8d', fontWeight: '500'}}>MMSI:</span>
                                        <span>{ship.MMSI}</span>

                                        <span style={{color: '#7f8c8d', fontWeight: '500'}}>Enlem:</span>
                                        <span>{ship.Latitude}° K</span>

                                        <span style={{color: '#7f8c8d', fontWeight: '500'}}>Boylam:</span>
                                        <span>{ship.Longitude}° D</span>

                                        <span style={{color: '#7f8c8d', fontWeight: '500'}}>Sürat:</span>
                                        <span>{ship.Speed} KTS</span>

                                        <span style={{color: '#7f8c8d', fontWeight: '500'}}>Rota:</span>
                                        <span>{ship.Course}°</span>
                                    </div>
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

