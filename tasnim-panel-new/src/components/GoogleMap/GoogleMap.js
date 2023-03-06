import React, {useEffect, useState} from 'react'
import locationImage from './location.png'
import {MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet'
import {TASNIM_POSITION} from '../../core/APP_URL'
import {makeStyles} from '@mui/styles'

function LocationMarker(props) {
    const map = useMapEvents({
        moveend(e) {
            props.positions(map.getCenter())
        },
    })

    var greenIcon = window.L.icon({
        iconUrl: require('./location.png'),
        shadowUrl: 'location.png',
        iconSize: [30, 30], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    })

    return props.positions.map((a) => <Marker position={a} icon={greenIcon} />)
    // <Marker position={props.positions} icon={greenIcon}>
    //     <Popup>کافه تسنیم</Popup>
    // </Marker>
}

function GoogleMap(props) {
    const classes = mapStyle()

    return (
        <MapContainer
            style={{width: '100%', height: '300px', margin: '10px'}}
            center={props.positions[0]}
            zoom={props.zoom ?? 16}
            scrollWheelZoom={true}
            dragging={true}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <img src={locationImage} className={classes.mapLocationImage} /> */}
            <LocationMarker positions={props.positions} />
        </MapContainer>
    )
}
const mapStyle = makeStyles((theme) => ({
    root: {
        // position: 'relative',
        // width: '120px',
        // height: '120px',
    },
    mapid: {
        height: '400px',
        position: 'relative',
        zIndex: '1',
    },
    mapLocationImage: {
        zIndex: '1000000000',
        position: 'absolute',
        width: '40px',
        height: '50px',
        left: 'calc(50% - 20px)',
        top: 'calc(50% - 50px)',
    },
}))

export default GoogleMap
