import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { calculateDistance } from '../utils/distance';

// Map updater component to smoothly pan/zoom
const MapUpdater = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, zoom, {
                animate: true,
                duration: 1.5
            });
        }
    }, [center, zoom, map]);
    return null;
};

// Custom Marker Icons
const createMarkerIcon = (color, isPulsing) => {
    return L.divIcon({
        className: 'custom-div-icon',
        html: `
            <div class="relative w-6 h-6 flex items-center justify-center">
                ${isPulsing ? `<div class="absolute w-full h-full rounded-full animate-ping" style="background-color: ${color}; opacity: 0.6"></div>` : ''}
                <div class="relative w-3 h-3 rounded-full border-2 border-background shadow-lg" style="background-color: ${color}; box-shadow: 0 0 10px ${color}"></div>
            </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });
};

const getMarkerColor = (distance) => {
    if (distance < 500) return '#EF4444'; // Red
    if (distance >= 500 && distance <= 2000) return '#EAB308'; // Yellow
    return '#22C55E'; // Green
};

const LiveMap = ({ onGeoTrigger }) => {
    const [position, setPosition] = useState(null);
    const [places, setPlaces] = useState([]);
    const [lastFetchPos, setLastFetchPos] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchNearbyPlaces = useCallback(async (lat, lng) => {
        try {
            console.log(`Fetching nearby places for ${lat}, ${lng}...`);
            const response = await axios.get(`http://localhost:3001/api/nearby-places?lat=${lat}&lng=${lng}`);
            console.log('Nearby places response data:', response.data);

            if (!Array.isArray(response.data)) {
                console.error('Expected array from backend, got:', typeof response.data);
                setLoading(false);
                return;
            }

            // Re-calculate exact distances
            const enrichedPlaces = response.data.map(place => ({
                ...place,
                distance: calculateDistance(lat, lng, place.lat, place.lon)
            }));

            // Trigger alerts for places < 300m
            const closePlace = enrichedPlaces.find(p => p.distance < 300);
            if (closePlace && onGeoTrigger) {
                // Ensure we only trigger if we haven't already for this place (we can debounce this upstream, but basic trigger here)
                onGeoTrigger(closePlace);
            }

            setPlaces(enrichedPlaces);
        } catch (error) {
            console.error('Error fetching nearby places:', error);
        } finally {
            setLoading(false);
        }
    }, [onGeoTrigger]);

    useEffect(() => {
        if (!navigator.geolocation) {
            console.error('Geolocation is not supported by your browser');
            setLoading(false);
            return;
        }

        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setPosition([latitude, longitude]);

                // Initial fetch or if moved > 200m
                if (!lastFetchPos) {
                    setLastFetchPos([latitude, longitude]);
                    fetchNearbyPlaces(latitude, longitude);
                } else {
                    const distMoved = calculateDistance(
                        lastFetchPos[0], lastFetchPos[1],
                        latitude, longitude
                    );

                    if (distMoved > 200) {
                        setLastFetchPos([latitude, longitude]);
                        fetchNearbyPlaces(latitude, longitude);
                    } else if (places.length > 0) {
                        // Update distances live without refetching API
                        const updatedDistances = places.map(place => {
                            const newDist = calculateDistance(latitude, longitude, place.lat, place.lon);
                            return { ...place, distance: newDist };
                        });
                        setPlaces(updatedDistances);

                        // Check trigger again
                        const closePlace = updatedDistances.find(p => p.distance < 300);
                        if (closePlace && onGeoTrigger) {
                            onGeoTrigger(closePlace);
                        }
                    }
                }
            },
            (err) => {
                console.error(`Geolocation error: ${err.message}`);
                setLoading(false);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 5000
            }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, [lastFetchPos, fetchNearbyPlaces, places, onGeoTrigger]);

    if (!position) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-background/50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-accent-cyan border-t-transparent rounded-full animate-spin" />
                    <p className="text-accent-cyan font-mono text-xs tracking-widest uppercase">Acquiring GPS Signal...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full relative">
            {loading && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-accent-cyan/30 flex items-center gap-3">
                    <div className="w-3 h-3 border-2 border-accent-cyan border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] font-mono text-accent-cyan tracking-widest uppercase">Scanning Area...</span>
                </div>
            )}
            <MapContainer
                center={position}
                zoom={14}
                className="w-full h-full"
                zoomControl={false}
                scrollWheelZoom={true} // Ensures zoom affects only map container
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                <MapUpdater center={position} zoom={14} />

                {/* User Position */}
                <Marker
                    position={position}
                    icon={createMarkerIcon('#00C6FF', true)}
                >
                    <Popup className="bg-background text-white border-accent-cyan">
                        <div className="font-mono text-xs">Current Location</div>
                    </Popup>
                </Marker>

                {/* Nearby Places */}
                {places.map((place) => {
                    const color = getMarkerColor(place.distance);
                    const isPulsing = place.distance < 500;

                    return (
                        <Marker
                            key={place.id}
                            position={[place.lat, place.lon]}
                            icon={createMarkerIcon(color, isPulsing)}
                        >
                            <Popup>
                                <div className="p-2 space-y-1 min-w-[150px]">
                                    <div className="text-xs font-bold text-gray-800 uppercase tracking-wider">{place.category}</div>
                                    <div className="text-sm font-black text-black">{place.name}</div>
                                    <div className="text-[10px] text-gray-500">{Math.round(place.distance)}m away</div>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>

            {/* Map Interaction Blockers / Overlays */}
            <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-[2.5rem] mix-blend-overlay" />
        </div>
    );
};

export default LiveMap;
