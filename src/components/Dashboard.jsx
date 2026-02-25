import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Map as MapIcon,
    BarChart3,
    MessageSquare,
    Bell,
    Settings,
    Activity,
    ArrowUpRight,
    Shield,
    Network
} from 'lucide-react';
import MapView from './MapView';
import AIInsights from './AIInsights';
import AnalyticsPanel from './AnalyticsPanel';
import TopStats from './TopStats';
import GeoNotification from './GeoNotification';
import KnowledgeGraph from './KnowledgeGraph';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showNotification, setShowNotification] = useState(false);
    const [viewMode, setViewMode] = useState('map');
    const [triggeredHospital, setTriggeredHospital] = useState(null);

    const handleGeoTrigger = (hospital) => {
        setTriggeredHospital(hospital);
        setShowNotification(true);
    };

    const navItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
        { id: 'map', icon: MapIcon, label: 'GIS Map' },
        { id: 'analytics', icon: BarChart3, label: 'Analytics' },
        { id: 'sentiment', icon: MessageSquare, label: 'Sentiment' },
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-background text-blue-50 relative">
            {/* Immersive Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(0,198,255,0.05)_0%,_transparent_70%)]" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,_rgba(77,168,255,0.05)_0%,_transparent_50%)]" />
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Sidebar */}
            <aside className="w-20 lg:w-72 border-r border-white-[0.03] flex flex-col pt-8 pb-6 bg-background/40 backdrop-blur-3xl z-20 relative">
                <div className="px-8 mb-12 flex items-center gap-4">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="p-3 bg-accent-cyan/15 rounded-2xl border border-accent-cyan/20 cursor-pointer shadow-[0_0_20px_rgba(0,198,255,0.1)]"
                    >
                        <Shield className="text-accent-cyan" size={24} />
                    </motion.div>
                    <div className="hidden lg:block">
                        <h1 className="font-display font-black text-xl tracking-tighter leading-none text-white">CICC</h1>
                        <p className="text-[9px] font-mono text-accent-cyan tracking-[0.2em] font-bold uppercase mt-1 opacity-70">Control Center v1.2</p>
                    </div>
                </div>

                <nav className="flex-1 w-full px-4 space-y-3">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 relative group ${activeTab === item.id
                                ? 'bg-accent-cyan/10 text-accent-cyan'
                                : 'text-gray-500 hover:text-white hover:bg-white-[0.03]'
                                }`}
                        >
                            <item.icon size={20} className={activeTab === item.id ? 'drop-shadow-[0_0_8px_rgba(0,198,255,0.5)]' : ''} />
                            <span className="hidden lg:block font-bold text-sm tracking-wide">{item.label}</span>
                            {activeTab === item.id && (
                                <motion.div
                                    layoutId="active-nav-glow"
                                    className="absolute left-0 w-1 h-6 bg-accent-cyan rounded-full shadow-[0_0_15px_rgba(0,198,255,0.8)]"
                                />
                            )}
                        </button>
                    ))}
                </nav>

                <div className="px-6 mt-auto space-y-6 w-full">
                    <div className="hidden lg:block p-5 rounded-[1.5rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-accent-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative z-10">
                            <p className="label-xs mb-3 text-gray-600">Core Systems</p>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[11px] font-bold text-gray-400 capitalize">Satellite Sync</span>
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold text-gray-400 capitalize">Neural Link</span>
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                            </div>
                        </div>
                    </div>

                    <button className="w-full flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-white transition-all hover:translate-x-1">
                        <Settings size={18} />
                        <span className="hidden lg:block font-bold text-sm">System Config</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative z-10">
                {/* Header */}
                <header className="h-24 px-10 border-b border-white/[0.03] flex items-center justify-between bg-background/20 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-[1px] bg-white/10 hidden md:block" />
                        <div>
                            <h2 className="text-xl font-display font-black text-white uppercase tracking-wider">Operational Dashboard</h2>
                            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.25em]">Regional Infrastructure Mapping | Sector 7-B</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="hidden xl:flex items-center gap-4 px-6 py-2.5 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div className="text-right">
                                <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-widest leading-none mb-1">Sector 7-B Status</span>
                                <span className="block text-xs font-display font-bold text-green-400 leading-none">OPTIMAL</span>
                            </div>
                            <div className="w-8 h-8 rounded-lg bg-green-400/10 flex items-center justify-center">
                                <Activity size={16} className="text-green-400" />
                            </div>
                        </div>

                        <div className="flex items-center gap-5">
                            <button className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-accent-cyan/50 hover:bg-accent-cyan/5 transition-all group relative">
                                <Bell size={20} className="text-gray-400 group-hover:text-white" />
                                <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-red-500 rounded-full border border-background shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                            </button>

                            <div className="h-12 w-[1px] bg-white/10" />

                            <div className="flex items-center gap-4 pl-2 cursor-pointer group">
                                <div className="text-right">
                                    <span className="block text-xs font-bold text-white group-hover:text-accent-cyan transition-colors">Admin_Mani</span>
                                    <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-widest">Lvl 4 Auth</span>
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-cyan to-accent-blue p-[1.5px] shadow-[0_8px_20px_rgba(0,198,255,0.2)]">
                                    <div className="w-full h-full rounded-[0.8rem] bg-background flex items-center justify-center font-display font-black text-[10px]">
                                        SA
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Body */}
                <div className="flex-1 overflow-y-auto p-10 space-y-10 scroll-smooth custom-scrollbar">
                    <TopStats />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Map Container - Fixed Behavior */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:col-span-8 group/map-container relative h-[650px] glass-panel rounded-[2.5rem] overflow-hidden border border-white/5"
                        >
                            <div className="absolute top-8 left-8 z-[50] flex gap-4">
                                <button
                                    onClick={() => setViewMode('map')}
                                    className={`px-6 py-2 rounded-xl font-display text-[10px] font-black border transition-all duration-500 tracking-[0.15em] flex items-center gap-3 ${viewMode === 'map'
                                        ? 'bg-accent-cyan border-accent-cyan text-black shadow-[0_0_30px_rgba(0,198,255,0.3)]'
                                        : 'bg-background/80 backdrop-blur-xl border-white/10 text-white/50'
                                        }`}
                                >
                                    <MapIcon size={14} />
                                    GIS LIVE VIEW
                                </button>
                                <button
                                    onClick={() => setViewMode('graph')}
                                    className={`px-6 py-2 rounded-xl font-display text-[10px] font-black border transition-all duration-500 tracking-[0.15em] flex items-center gap-3 ${viewMode === 'graph'
                                        ? 'bg-accent-cyan border-accent-cyan text-black shadow-[0_0_30px_rgba(0,198,255,0.3)]'
                                        : 'bg-background/80 backdrop-blur-xl border-white/10 text-white/50'
                                        }`}
                                >
                                    <Network size={14} />
                                    KNOWLEDGE GRAPH
                                </button>
                            </div>

                            <div className="absolute top-8 right-8 z-[50] capitalize px-4 py-2 bg-black/40 backdrop-blur-md rounded-xl border border-white/5 text-[9px] font-mono font-bold tracking-widest text-accent-cyan shadow-xl">
                                Precision: 0.002m
                            </div>

                            <div className="h-full w-full">
                                <AnimatePresence mode="wait">
                                    {viewMode === 'map' ? (
                                        <motion.div
                                            key="map"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="h-full w-full"
                                        >
                                            <MapView onGeoTrigger={handleGeoTrigger} />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="graph"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="h-full w-full"
                                        >
                                            <KnowledgeGraph />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>

                        {/* Side Panels */}
                        <div className="lg:col-span-4 flex flex-col gap-10">
                            <AIInsights />

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="flex-1 glass-panel rounded-[2.5rem] p-8 border border-white/5 flex flex-col group"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h3 className="font-display font-black text-sm tracking-wider uppercase text-white">Ward Performance</h3>
                                        <p className="label-xs mt-1">Efficiency Ranking</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-2xl bg-accent-cyan/10 flex items-center justify-center text-accent-cyan group-hover:scale-110 transition-transform">
                                        <Activity size={18} />
                                    </div>
                                </div>

                                <div className="flex-1 space-y-4">
                                    {[
                                        { ward: 'Ward 5', score: 94.2, trend: 'up' },
                                        { ward: 'Ward 12', score: 88.5, trend: 'up' },
                                        { ward: 'Ward 03', score: 82.1, trend: 'down' },
                                        { ward: 'Ward 08', score: 79.8, trend: 'up' }
                                    ].map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.02)' }}
                                            className="flex items-center justify-between p-4 rounded-2xl border border-white/[0.03] bg-white/[0.01] transition-all cursor-pointer"
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="text-[10px] font-mono text-gray-500">0{idx + 1}</span>
                                                <span className="font-bold text-sm text-blue-100">{item.ward}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-sm font-display font-black text-accent-cyan tracking-tighter">{item.score}</span>
                                                <div className={`p-1 rounded-md ${item.trend === 'up' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                                    <ArrowUpRight size={14} className={item.trend === 'up' ? '' : 'rotate-90'} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <button className="mt-8 w-full py-4 rounded-2xl border border-white/5 bg-white/5 font-display text-[10px] font-black tracking-[0.2em] text-gray-400 hover:text-white hover:bg-white-[0.03] transition-all">
                                    VIEW ARCHIVAL DATA
                                </button>
                            </motion.div>
                        </div>
                    </div>

                    <AnalyticsPanel />
                </div>

                <AnimatePresence>
                    {showNotification && (
                        <GeoNotification
                            data={triggeredHospital}
                            onClose={() => setShowNotification(false)}
                        />
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default Dashboard;
