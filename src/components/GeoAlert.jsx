import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hospital, GraduationCap, Building2, MapPin, X } from 'lucide-react';

const GeoAlert = ({ data, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 6000);

        return () => clearTimeout(timer);
    }, [data, onClose]);

    if (!data) return null;

    const getIcon = () => {
        switch (data.category) {
            case 'Hospital': return <Hospital className="text-red-400" size={24} />;
            case 'College': return <GraduationCap className="text-blue-400" size={24} />;
            default: return <Building2 className="text-gray-400" size={24} />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-10 right-10 z-[100] w-96 rounded-2xl border border-red-500/50 bg-black/60 backdrop-blur-xl shadow-[0_0_30px_rgba(239,68,68,0.2)]"
        >
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-red-500/20 shadow-[inset_0_0_20px_rgba(239,68,68,0.1)] pointer-events-none" />

            <div className="p-5 relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                            {getIcon()}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/30 uppercase">
                                    Proximity Alert
                                </span>
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            </div>
                            <h3 className="text-red-50 font-display font-black text-lg mt-1">{data.category} Detected</h3>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                        <X size={18} />
                    </button>
                </div>

                <div className="space-y-3 bg-black/40 rounded-xl p-4 border border-white/5">
                    <div>
                        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1">Entity Name</p>
                        <p className="font-bold text-sm text-white">{data.name}</p>
                    </div>

                    <div className="flex items-start gap-2">
                        <MapPin size={14} className="text-gray-500 mt-0.5 shrink-0" />
                        <p className="text-xs text-gray-300 leading-tight">{data.address}</p>
                    </div>

                    <div className="pt-2 mt-2 border-t border-white/10 flex justify-between items-center">
                        <span className="text-[10px] font-mono text-gray-400 uppercase">Current Distance</span>
                        <span className="font-display font-black text-lg text-red-400">{Math.round(data.distance)}m</span>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-1 bg-red-500/20 rounded-b-2xl overflow-hidden">
                <motion.div
                    initial={{ scaleX: 1 }}
                    animate={{ scaleX: 0 }}
                    transition={{ duration: 6, ease: "linear" }}
                    className="h-full bg-red-500 origin-left"
                />
            </div>
        </motion.div>
    );
};

export default GeoAlert;
