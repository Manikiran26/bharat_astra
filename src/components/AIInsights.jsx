import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Sparkles, ChevronRight, Cpu } from 'lucide-react';

const AIInsights = () => {
    const insights = [
        "Ward 5 shows 14% improvement in logistics efficiency following Smart Streetlight deployment.",
        "Potential infrastructure bottleneck detected in Sector 7 due to delayed road expansion.",
        "Public sentiment in Ward 12 has increased by 8% regarding public health initiatives.",
        "Acoustic sensors indicate increased traffic noise in residential zones near Metro Hub."
    ];

    const [currentInsight, setCurrentInsight] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        let charIndex = 0;
        const text = insights[currentInsight];
        setDisplayText('');
        setIsTyping(true);

        const typingInterval = setInterval(() => {
            if (charIndex < text.length) {
                setDisplayText(prev => prev + text[charIndex]);
                charIndex++;
            } else {
                setIsTyping(false);
                clearInterval(typingInterval);

                setTimeout(() => {
                    setCurrentInsight((prev) => (prev + 1) % insights.length);
                }, 5000);
            }
        }, 40);

        return () => clearInterval(typingInterval);
    }, [currentInsight]);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-8 rounded-[2.5rem] border border-white/5 overflow-hidden relative group"
        >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Cpu size={80} className="text-accent-cyan" />
            </div>

            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-accent-cyan/15 rounded-2xl border border-accent-cyan/20 shadow-[0_0_15px_rgba(0,198,255,0.1)] relative overflow-hidden">
                    <BrainCircuit size={20} className="text-accent-cyan animate-pulse relative z-10" />
                    <div className="absolute inset-0 bg-accent-cyan animate-pulse opacity-10" />
                </div>
                <div>
                    <h3 className="font-display font-black text-xs tracking-[0.15em] text-white uppercase">Governance Engine</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="w-1 h-1 rounded-full bg-accent-cyan animate-ping" />
                        <p className="text-[9px] text-accent-cyan font-mono font-bold tracking-widest uppercase opacity-70">NEURAL_SYNC_OPTIMAL</p>
                    </div>
                </div>
            </div>

            <div className="min-h-[120px] mb-8 relative">
                <div className="absolute -left-4 top-0 h-full w-[1px] bg-gradient-to-b from-accent-cyan/50 to-transparent opacity-30" />
                <p className="text-sm leading-[1.8] text-blue-100/90 font-medium">
                    <span className="text-accent-cyan/50 font-mono text-[10px] block mb-2 uppercase tracking-widest"> ANALYZING_RECURSIVE_PATTERNS</span>
                    <span className="italic">"{displayText}"</span>
                    {isTyping && <motion.span
                        animate={{ opacity: [0, 1] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-1.5 h-4 ml-1 bg-accent-cyan shadow-[0_0_8px_rgba(0,198,255,1)]"
                    />}
                </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/[0.03]">
                <div className="flex gap-2">
                    {insights.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 rounded-full transition-all duration-700 ${currentInsight === i ? 'w-8 bg-accent-cyan shadow-[0_0_10px_rgba(0,198,255,0.5)]' : 'w-2 bg-white/5'}`}
                        />
                    ))}
                </div>
                <motion.button
                    whileHover={{ x: 3 }}
                    className="flex items-center gap-2 text-[10px] font-display font-black text-accent-cyan tracking-widest uppercase hover:text-white transition-colors"
                >
                    EXPLORE NETWORK <ChevronRight size={14} />
                </motion.button>
            </div>

            <Sparkles className="absolute -bottom-4 -right-4 text-accent-cyan/5 w-24 h-24 pointer-events-none rotate-12" />
        </motion.div>
    );
};

export default AIInsights;
