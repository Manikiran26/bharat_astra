import React from 'react';
import { motion } from 'framer-motion';
import {
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    BarChart,
    Bar
} from 'recharts';

const data = [
    { name: 'Mon', sentiment: 65, impact: 72 },
    { name: 'Tue', sentiment: 68, impact: 70 },
    { name: 'Wed', sentiment: 75, impact: 75 },
    { name: 'Thu', sentiment: 72, impact: 82 },
    { name: 'Fri', sentiment: 80, impact: 85 },
    { name: 'Sat', sentiment: 85, impact: 88 },
    { name: 'Sun', sentiment: 82, impact: 84 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass-panel p-4 rounded-xl border border-white/10 shadow-2xl">
                <p className="text-[10px] font-display font-black text-gray-500 uppercase tracking-widest mb-2">{label}</p>
                <div className="space-y-1">
                    {payload.map((entry, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                            <span className="text-xs font-bold text-white uppercase tracking-tight">{entry.name}: {entry.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

const AnalyticsPanel = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="glass-panel p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden group"
            >
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h3 className="font-display font-black text-sm tracking-widest text-white uppercase">Public Sentiment Spectrum</h3>
                        <p className="label-xs mt-1">Real-time NLP Sentiment Tracking</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-accent-cyan/10 border border-accent-cyan/20 rounded-full">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                        <span className="text-[9px] font-display font-black text-accent-cyan uppercase tracking-widest">Live Flux</span>
                    </div>
                </div>

                <div className="h-[320px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorSentiment" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00C6FF" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#00C6FF" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="rgba(255,255,255,0.03)" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#4b5563', fontSize: 10, fontFamily: 'Inter', fontWeight: 600 }}
                                dy={15}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#4b5563', fontSize: 10, fontFamily: 'Inter', fontWeight: 600 }}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(0,198,255,0.2)', strokeWidth: 1 }} />
                            <Area
                                type="monotone"
                                dataKey="sentiment"
                                name="Sentiment"
                                stroke="#00C6FF"
                                fillOpacity={1}
                                fill="url(#colorSentiment)"
                                strokeWidth={3}
                                animationDuration={2000}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="glass-panel p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden group"
            >
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h3 className="font-display font-black text-sm tracking-widest text-white uppercase">Development Impact Quotient</h3>
                        <p className="label-xs mt-1">Correlation: Spend vs CDI Score</p>
                    </div>
                </div>

                <div className="h-[320px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="rgba(255,255,255,0.03)" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#4b5563', fontSize: 10, fontFamily: 'Inter', fontWeight: 600 }}
                                dy={15}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#4b5563', fontSize: 10, fontFamily: 'Inter', fontWeight: 600 }}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                            <Bar
                                dataKey="impact"
                                name="Impact"
                                fill="#4DA8FF"
                                radius={[6, 6, 2, 2]}
                                barSize={32}
                                animationDuration={2500}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </div>
    );
};

export default AnalyticsPanel;
