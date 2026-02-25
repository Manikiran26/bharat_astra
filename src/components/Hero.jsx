import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Zap, Globe, Cpu, ChevronDown } from 'lucide-react';

const Hero = ({ onLaunch }) => {
    return (
        <div className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
            {/* Immersive Animated Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a365d_0%,_#0B1C2D_100%)] opacity-50" />

                {/* Subtle Moving Grid */}
                <motion.div
                    animate={{
                        backgroundPosition: ['0px 0px', '40px 40px'],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: 'linear-gradient(to right, rgba(0, 198, 255, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 198, 255, 0.5) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Floating AI Nodes */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-accent-cyan/10 blur-[1px] border border-accent-cyan/20"
                        style={{
                            width: Math.random() * 60 + 20 + 'px',
                            height: Math.random() * 60 + 20 + 'px',
                            left: Math.random() * 100 + '%',
                            top: Math.random() * 100 + '%',
                        }}
                        animate={{
                            y: [0, -40, 0],
                            x: [0, 20, 0],
                            opacity: [0.1, 0.3, 0.1],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 5
                        }}
                    />
                ))}

                {/* Scanning Line */}
                <motion.div
                    animate={{ top: ['0%', '100%'] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent z-10"
                />
            </div>

            {/* Hero Content */}
            <div className="relative z-20 text-center px-6 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-center gap-4 mb-10"
                >
                    <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-accent-cyan/50" />
                    <span className="text-accent-cyan font-display font-black text-[10px] uppercase tracking-[0.4em]">Integrated Intelligence</span>
                    <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-accent-cyan/50" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-7xl md:text-9xl font-display font-black mb-8 tracking-tighter text-white leading-[0.9]"
                >
                    CIVIC <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-cyan bg-[length:200%_auto] animate-gradient-shift">
                        INTELLIGENCE
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-gray-400 text-lg md:text-2xl mb-16 max-w-3xl mx-auto leading-relaxed font-light"
                >
                    Transforming static infrastructure into a live, interactive <span className="text-white font-medium">governance intelligence system</span> powered by neural networks.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center gap-10"
                >
                    <button
                        onClick={onLaunch}
                        className="group relative px-14 py-6 bg-accent-cyan text-black font-display font-black text-xs uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(0,198,255,0.3)]"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Launch Command Center
                            <Zap size={18} className="fill-current animate-pulse opacity-70" />
                        </span>
                        <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-20" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-sweep pointer-events-none" />
                    </button>

                    <div className="flex items-center gap-12 text-gray-500 text-[10px] font-display font-black tracking-widest uppercase">
                        <div className="flex items-center gap-3 group">
                            <Shield size={16} className="text-accent-cyan opacity-50 group-hover:opacity-100 transition-opacity" />
                            <span className="group-hover:text-blue-200 transition-colors">Gov-Class Network</span>
                        </div>
                        <div className="flex items-center gap-3 group">
                            <Globe size={16} className="text-accent-cyan opacity-50 group-hover:opacity-100 transition-opacity" />
                            <span className="group-hover:text-blue-200 transition-colors">GIS Real-Time</span>
                        </div>
                        <div className="flex items-center gap-3 group">
                            <Cpu size={16} className="text-accent-cyan opacity-50 group-hover:opacity-100 transition-opacity" />
                            <span className="group-hover:text-blue-200 transition-colors">Neural Processing</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Blueprint elements */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-20 z-20">
                <ChevronDown size={24} className="text-accent-cyan" />
            </div>

            {/* Corner Data Widgets */}
            <div className="absolute top-12 left-12 hidden lg:block opacity-30 select-none">
                <div className="font-mono text-[9px] text-accent-cyan space-y-1">
                    <p>LAT: 51.505N</p>
                    <p>LNG: 0.09W</p>
                    <p>ALT: 242M</p>
                </div>
            </div>
        </div>
    );
};

export default Hero;
