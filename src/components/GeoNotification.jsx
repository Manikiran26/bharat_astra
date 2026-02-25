import React from 'react';
import { motion } from 'framer-motion';
import { Hospital, MapPin, X, ArrowRight, Activity, Percent, Layers } from 'lucide-react';

const GeoNotification = ({ onClose, data }) => {
    // If no hospital data is provided, return null or show a default message
    if (!data) return null;

    return (
        <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="fixed bottom-12 right-12 z-[100] w-full max-w-sm"
        >
            <div className="glass-panel p-6 rounded-[2.5rem] border border-accent-cyan/30 shadow-[0_0_50px_rgba(0,198,255,0.2)] overflow-hidden relative group">
                {/* Animated Glow Border Segment */}
                <div className="absolute top-0 left-0 w-2 h-full bg-accent-cyan shadow-[0_0_15px_rgba(0,198,255,0.5)]" />

                <div className="flex gap-5">
                    <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan relative overflow-hidden">
                            <Hospital size={32} />
                            <motion.div
                                className="absolute inset-0 rounded-2xl border-2 border-accent-cyan"
                                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                            />
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-display font-black text-accent-cyan uppercase tracking-[0.25em]">Hospital Intel v1.2</span>
                            <button
                                onClick={onClose}
                                className="p-1.5 rounded-xl hover:bg-white/5 transition-colors text-gray-500 hover:text-white"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <h4 className="font-display font-black text-xs text-white uppercase tracking-widest mb-4 leading-tight">
                            {data.name}
                        </h4>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                                <div className="flex items-center gap-1.5 mb-1">
                                    <Activity size={12} className="text-accent-cyan" />
                                    <span className="text-[9px] text-gray-500 font-mono tracking-tighter uppercase">Capacities</span>
                                </div>
                                <p className="text-xs font-display font-bold text-white tracking-widest">{data.bedCapacity}</p>
                            </div>
                            <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                                <div className="flex items-center gap-1.5 mb-1">
                                    <Percent size={12} className="text-green-400" />
                                    <span className="text-[9px] text-gray-500 font-mono tracking-tighter uppercase">HHI Score</span>
                                </div>
                                <p className="text-xs font-display font-bold text-green-400 tracking-widest">{data.performanceScore}</p>
                            </div>
                        </div>

                        <div className="bg-accent-cyan/5 p-4 rounded-2xl border border-accent-cyan/10 mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Layers size={14} className="text-accent-cyan" />
                                <span className="text-[10px] font-bold text-white uppercase tracking-wider">ICU Status: {data.icuAvailability} Slots Free</span>
                            </div>
                            <p className="text-[10px] text-gray-400 leading-relaxed font-medium">
                                Real-time sync indicates optimal response preparedness for current sector load.
                            </p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center gap-3 py-3.5 bg-accent-cyan text-black font-display font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-[0_0_20px_rgba(0,198,255,0.3)] transition-all group/btn"
                            onClick={onClose}
                        >
                            DEPLOY RESOURCES
                            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                        </motion.button>
                    </div>
                </div>

                {/* Decorative Background Icon */}
                <div className="absolute -bottom-10 -right-10 opacity-[0.03] text-accent-cyan pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
                    <Hospital size={150} />
                </div>
            </div>
        </motion.div>
    );
};

export default GeoNotification;
