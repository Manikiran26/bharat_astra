import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateDistance } from '../utils/distance';
import { Loader2, Hospital as HospitalIcon } from 'lucide-react';

// Custom hospital icon for dark theme
const createHospitalIcon = (isActive = false) => {
    return L.divIcon({
        html: `
      <div class="relative flex items-center justify-center">
        ${isActive ? '<div class="marker-ripple" style="border-color: #00C6FF"></div>' : ''}
        <div class="w-8 h-8 rounded-xl bg-background/80 border-2 ${isActive ? 'border-accent-cyan shadow-[0_0_15px_#00C6FF]' : 'border-white/20'} flex items-center justify-center transition-all duration-500 backdrop-blur-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${isActive ? '#00C6FF' : '#94a3b8'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6v12"/><path d="M18 12H6"/></svg>
        </div>
      </div>
    `,
        className: 'custom-hospital-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
    });
};

const MapController = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, 14, { duration: 2 });
        }
    }, [center, map]);
    return null;
};

const MapView = ({ onGeoTrigger }) => {
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState([12.9716, 77.5946]); // Default to Bangalore
    const [triggeredId, setTriggeredId] = useState(null);
    const mapRef = useRef(null);

    useEffect(() => {
        // Attempt to get real geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const newLoc = [pos.coords.latitude, pos.coords.longitude];
                    setUserLocation(newLoc);
                    fetchHospitals(newLoc[0], newLoc[1]);
                },
                () => fetchHospitals(12.9716, 77.5946)
            );
        } else {
            fetchHospitals(12.9716, 77.5946);
        }
    }, []);

    const fetchHospitals = async (lat, lng) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3001/api/hospitals?lat=${lat}&lng=${lng}`);
            const data = await response.json();
            setHospitals(data);
        } catch (error) {
            console.error('Failed to fetch hospitals:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!userLocation || hospitals.length === 0) return;

        // Geo-fencing check (300m)
        hospitals.forEach(hospital => {
            const dist = calculateDistance(userLocation[0], userLocation[1], hospital.lat, hospital.lng);
            if (dist <= 300 && triggeredId !== hospital.id) {
                setTriggeredId(hospital.id);
                onGeoTrigger(hospital);
            }
        });
    }, [userLocation, hospitals, triggeredId, onGeoTrigger]);

    return (
        <div className="h-full w-full relative group/map overflow-hidden">
            {loading && (
                <div className="absolute inset-0 z-[100] bg-background/40 backdrop-blur-sm flex flex-col items-center justify-center">
                    <Loader2 className="w-10 h-10 text-accent-cyan animate-spin mb-4" />
                    <p className="font-display text-[10px] font-black tracking-widest text-accent-cyan uppercase">Syncing Hospital Data...</p>
                </div>
            )}

            {/* Map Boundary Isolation */}
            <MapContainer
                center={userLocation}
                zoom={13}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%', background: '#0B1C2D' }}
                zoomControl={false}
                className="z-0"
                ref={mapRef}
                whenReady={(mapInstance) => {
                    L.DomEvent.disableScrollPropagation(mapInstance.target.getContainer());
                }}
            >
                <TileLayer
                    attribution='&copy; CARTO'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                <ZoomControl position="topright" />
                <MapController center={userLocation} />

                <AnimatePresence>
                    {hospitals.map((hospital) => (
                        <Marker
                            key={hospital.id}
                            position={[hospital.lat, hospital.lng]}
                            icon={createHospitalIcon(triggeredId === hospital.id)}
                        >
                            <Popup closeButton={false} offset={[0, -10]}>
                                <div className="glass-panel p-5 rounded-2xl border border-white/10 min-w-[240px] shadow-2xl">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-accent-cyan/10 rounded-lg">
                                            <HospitalIcon size={16} className="text-accent-cyan" />
                                        </div>
                                        <div>
                                            <h4 className="font-display text-xs font-bold text-white tracking-widest">{hospital.name}</h4>
                                            <p className="text-[10px] text-gray-400 mt-1 uppercase font-mono">{hospital.category}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between items-center text-[10px] font-mono">
                                            <span className="text-gray-500 uppercase tracking-tighter">Capacity</span>
                                            <span className="text-white font-bold">{hospital.bedCapacity} Total</span>
                                        </div>
                                        <div className="flex justify-between items-center text-[10px] font-mono">
                                            <span className="text-gray-500 uppercase tracking-tighter">ICU Availability</span>
                                            <span className="text-accent-cyan font-bold">{hospital.icuAvailability} Free</span>
                                        </div>
                                        <div className="flex justify-between items-center text-[10px] font-mono border-t border-white/5 pt-2">
                                            <span className="text-gray-500 uppercase tracking-tighter">HHI Score</span>
                                            <span className="text-green-400 font-bold">{hospital.performanceScore}</span>
                                        </div>
                                    </div>

                                    <button className="w-full py-2.5 bg-accent-cyan/10 border border-accent-cyan/20 rounded-xl text-[10px] font-display font-black text-accent-cyan tracking-widest uppercase hover:bg-accent-cyan hover:text-black transition-all">
                                        Generate Health Intel
                                    </button>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </AnimatePresence>
            </MapContainer>

            {/* Precision Hud Overlay */}
            <div className="absolute bottom-8 left-8 z-10 pointer-events-none">
                <div className="glass-panel px-4 py-2 rounded-xl border border-white/10">
                    <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1">Active Scan Area</p>
                    <p className="text-[10px] font-display font-bold text-accent-cyan uppercase tracking-wider">Sector 7-B Healthcare Hub</p>
                </div>
            </div>
        </div>
    );
};

export default MapView;
