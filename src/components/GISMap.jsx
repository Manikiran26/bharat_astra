import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion } from 'framer-motion';

// Fix for default marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom Pulsing Icon
const createPulsingIcon = (color) => {
    return L.divIcon({
        html: `
      <div class="relative flex items-center justify-center">
        <div class="marker-ripple" style="border-color: ${color}"></div>
        <div class="w-3 h-3 rounded-full shadow-[0_0_10px_${color}]" style="background-color: ${color}"></div>
      </div>
    `,
        className: 'custom-pulsing-icon',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
};

const MapController = () => {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        // Disable scroll wheel propagation to document
        map.scrollWheelZoom.enable();
        const container = map.getContainer();

        L.DomEvent.disableScrollPropagation(container);
        L.DomEvent.on(container, 'mousewheel', L.DomEvent.stopPropagation);
        L.DomEvent.on(container, 'wheel', L.DomEvent.stopPropagation);

        // Set view with ease
        map.flyTo([51.505, -0.09], 13, {
            duration: 1.5,
            easeLinearity: 0.25
        });
    }, [map]);

    return null;
};

const GISMap = () => {
    const mapRef = useRef(null);

    const projects = [
        { id: 1, name: "Ward 5 Smart Streetlights", pos: [51.505, -0.09], status: "completed", type: "energy" },
        { id: 2, name: "Sector 7 Road Expansion", pos: [51.515, -0.1], status: "in-progress", type: "transport" },
        { id: 3, name: "Metro Hub Construction", pos: [51.49, -0.08], status: "delayed", type: "transport" },
        { id: 4, name: "Public Health Center B", pos: [51.52, -0.12], status: "completed", type: "health" },
    ];

    const getMarkerColor = (status) => {
        switch (status) {
            case 'completed': return '#00ff9d';
            case 'in-progress': return '#ffcc00';
            case 'delayed': return '#ff3333';
            default: return '#00C6FF';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full relative overflow-hidden group/map"
            whileHover={{ scale: 1.002 }}
            transition={{ duration: 0.5 }}
        >
            <div className="absolute inset-0 pointer-events-none border border-accent-cyan/0 group-hover/map:border-accent-cyan/20 transition-all duration-700 z-10 rounded-3xl" />

            <MapContainer
                center={[51.505, -0.09]}
                zoom={13}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%', background: '#0B1C2D' }}
                zoomControl={false}
                className="z-0"
            >
                <TileLayer
                    attribution='&copy; CARTO'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                <ZoomControl position="topright" />
                <MapController />

                {projects.map((proj) => (
                    <Marker
                        key={proj.id}
                        position={proj.pos}
                        icon={createPulsingIcon(getMarkerColor(proj.status))}
                    >
                        <Popup closeButton={false} offset={[0, -10]}>
                            <div className="glass-panel p-4 rounded-2xl border border-white/10 min-w-[220px] shadow-2xl">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getMarkerColor(proj.status) }} />
                                    <h4 className="font-display text-xs font-bold text-white tracking-widest">{proj.name}</h4>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between items-center text-[10px] font-mono">
                                        <span className="text-gray-500 uppercase tracking-tighter">Status</span>
                                        <span className="font-bold" style={{ color: getMarkerColor(proj.status) }}>{proj.status.toUpperCase()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-mono">
                                        <span className="text-gray-500 uppercase tracking-tighter">Impact</span>
                                        <span className="text-accent-cyan font-bold">HIGH</span>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(0, 198, 255, 0.1)' }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-accent-cyan tracking-widest uppercase transition-all"
                                >
                                    Generate Intelligence
                                </motion.button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Map Parallax Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-background/40 z-[5]" />
        </motion.div>
    );
};

export default GISMap;
