import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Network,
    Trash2,
    User,
    Building2,
    AlertTriangle,
    Smile,
    Info
} from 'lucide-react';

const KnowledgeGraph = () => {
    const [hoveredNode, setHoveredNode] = useState(null);

    const nodes = [
        { id: 'ward-5', type: 'ward', label: 'Ward 5', pos: { x: 400, y: 350 }, icon: Network },
        { id: 'proj-1', type: 'project', label: 'Smart Lights', pos: { x: 250, y: 200 }, icon: Building2 },
        { id: 'proj-2', type: 'project', label: 'Hospital B', pos: { x: 550, y: 200 }, icon: Building2 },
        { id: 'cont-1', type: 'contractor', label: 'BuildCorp', pos: { x: 180, y: 150 }, icon: User },
        { id: 'comp-1', type: 'complaint', label: 'Noise Issue', pos: { x: 650, y: 450 }, icon: AlertTriangle },
        { id: 'sent-1', type: 'sentiment', label: 'Positive', pos: { x: 400, y: 530 }, icon: Smile },
    ];

    const edges = [
        { from: 'ward-5', to: 'proj-1' },
        { from: 'ward-5', to: 'proj-2' },
        { from: 'proj-1', to: 'cont-1' },
        { from: 'proj-2', to: 'comp-1' },
        { from: 'comp-1', to: 'sent-1' },
        { from: 'proj-1', to: 'sent-1' },
    ];

    return (
        <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
            {/* Background Grid for Graph */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                backgroundImage: 'linear-gradient(to right, #4DA8FF 1px, transparent 1px), linear-gradient(to bottom, #4DA8FF 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }} />

            {/* Repositioned Title to avoid overlapping Dashboard buttons */}
            <div className="absolute top-28 left-10 z-[5] space-y-2 pointer-events-none">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent-cyan/10 rounded-lg border border-accent-cyan/20">
                        <Network className="text-accent-cyan" size={18} />
                    </div>
                    <h3 className="font-display font-black text-sm tracking-[0.15em] text-white uppercase transition-all group-hover:text-accent-cyan">
                        Network Topology
                    </h3>
                </div>
                <p className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.2em] ml-11">Structural Dependency Analysis</p>
            </div>

            <svg width="100%" height="100%" viewBox="0 0 800 600" className="relative z-0">
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Animated Edges */}
                {edges.map((edge, idx) => {
                    const from = nodes.find(n => n.id === edge.from).pos;
                    const to = nodes.find(n => n.id === edge.to).pos;
                    const isActive = hoveredNode?.id === edge.from || hoveredNode?.id === edge.to;

                    return (
                        <g key={idx}>
                            <motion.path
                                d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
                                fill="none"
                                stroke={isActive ? "rgba(0, 198, 255, 0.4)" : "rgba(0, 198, 255, 0.08)"}
                                strokeWidth={isActive ? "2" : "1"}
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="transition-all duration-300"
                            />
                            {isActive && (
                                <motion.circle
                                    r="3"
                                    fill="#00C6FF"
                                    filter="url(#glow)"
                                    animate={{ offsetDistance: ["0%", "100%"] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    style={{ offsetPath: `path("M ${from.x} ${from.y} L ${to.x} ${to.y}")` }}
                                />
                            )}
                        </g>
                    );
                })}

                {/* Nodes */}
                {nodes.map((node) => (
                    <motion.g
                        key={node.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.1 }}
                        onMouseEnter={() => setHoveredNode(node)}
                        onMouseLeave={() => setHoveredNode(null)}
                        className="cursor-pointer"
                    >
                        {/* Outer Glow */}
                        <AnimatePresence>
                            {hoveredNode?.id === node.id && (
                                <motion.circle
                                    initial={{ r: 24, opacity: 0 }}
                                    animate={{ r: 35, opacity: 0.2 }}
                                    exit={{ r: 24, opacity: 0 }}
                                    cx={node.pos.x}
                                    cy={node.pos.y}
                                    fill="#00C6FF"
                                    filter="url(#glow)"
                                />
                            )}
                        </AnimatePresence>

                        <circle
                            cx={node.pos.x}
                            cy={node.pos.y}
                            r="26"
                            fill={hoveredNode?.id === node.id ? "#0B1C2D" : "rgba(11, 28, 45, 0.8)"}
                            stroke={hoveredNode?.id === node.id ? "#00C6FF" : "rgba(255, 255, 255, 0.1)"}
                            strokeWidth="2"
                            className="transition-all duration-300 backdrop-blur-md"
                        />

                        <foreignObject x={node.pos.x - 12} y={node.pos.y - 12} width="24" height="24">
                            <node.icon
                                size={22}
                                className={hoveredNode?.id === node.id ? "text-accent-cyan" : "text-gray-500"}
                            />
                        </foreignObject>

                        <text
                            x={node.pos.x}
                            y={node.pos.y + 45}
                            textAnchor="middle"
                            fill={hoveredNode?.id === node.id ? "#00C6FF" : "white"}
                            className="text-[9px] font-display font-black uppercase tracking-[0.15em] pointer-events-none transition-colors"
                        >
                            {node.label}
                        </text>

                        {/* Pulsing Core for important nodes */}
                        {node.type === 'ward' && (
                            <circle
                                cx={node.pos.x}
                                cy={node.pos.y}
                                r="4"
                                fill="#00C6FF"
                                className="animate-pulse shadow-[0_0_10px_#00C6FF]"
                            />
                        )}
                    </motion.g>
                ))}
            </svg>

            {/* Node Info Overlay */}
            <AnimatePresence>
                {hoveredNode && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-10 left-10 glass-panel p-5 rounded-2xl border border-accent-cyan/20 min-w-[200px]"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-[10px] font-display font-black text-white uppercase tracking-widest">{hoveredNode.label} Meta</span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between font-mono text-[10px]">
                                <span className="text-gray-500">ID</span>
                                <span className="text-white">0x{hoveredNode.id.toUpperCase()}</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Legend */}
            <div className="absolute bottom-10 right-10 flex flex-col gap-3 p-5 glass-panel rounded-2xl border border-white/5">
                {[
                    { color: 'bg-accent-cyan', label: 'Ward Hub' },
                    { color: 'bg-accent-blue', label: 'Infra Project' }
                ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                        <span className="text-[9px] text-gray-400 uppercase font-display font-black tracking-widest leading-none">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KnowledgeGraph;
