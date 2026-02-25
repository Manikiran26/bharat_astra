import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
    Activity,
    TrendingUp,
    Layers,
    AlertCircle
} from 'lucide-react';

const CountUp = ({ value, suffix = '', prefix = '' }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const target = parseFloat(value);
        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out expo
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const current = easeProgress * target;

            setDisplayValue(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [value]);

    return (
        <span className="font-display">
            {prefix}
            {displayValue.toFixed(displayValue > 100 ? 0 : 1)}
            {suffix}
        </span>
    );
};

const StatCard = ({ label, value, subvalue, icon: Icon, color, delay }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 300, damping: 30 });

    function handleMouseMove(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(event.clientX - centerX);
        y.set(event.clientY - centerY);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000,
                rotateX,
                rotateY,
            }}
            className="stat-card-sweep group"
        >
            <div className="glass-panel p-7 rounded-[2rem] border border-white/5 relative overflow-hidden flex flex-col h-full bg-gradient-to-br from-white/[0.03] to-transparent hover:glow-border transition-all duration-500">
                {/* Light Sweep Animation */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:animate-sweep" />
                </div>

                <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 group-hover:border-accent-cyan/30 transition-colors">
                        <Icon size={22} className={color} />
                    </div>
                    <div className="flex flex-col items-end">
                        <span className={`text-[10px] font-display font-black tracking-widest ${color} opacity-80 uppercase`}>Live</span>
                        <div className={`w-1 h-1 rounded-full ${color} animate-pulse mt-1 shadow-[0_0_8px_${color}]`} />
                    </div>
                </div>

                <div className="mt-auto">
                    <p className="label-xs mb-1 group-hover:text-blue-200/50 transition-colors uppercase tracking-[0.25em]">{label}</p>
                    <h3 className="text-4xl font-display font-extrabold tracking-tighter mb-2 group-hover:text-white transition-colors">
                        <CountUp
                            value={value}
                            suffix={typeof value === 'string' && value.includes('%') ? '%' : ''}
                        />
                    </h3>
                    <div className="flex items-center gap-2">
                        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/5`}>
                            <TrendingUp size={10} className={color} />
                            <span className={`text-[9px] font-bold ${color}`}>{subvalue}</span>
                        </div>
                        <span className="text-[9px] text-gray-600 font-mono uppercase tracking-tighter">Verified Data</span>
                    </div>
                </div>

                {/* Decorative Background Glow */}
                <div className={`absolute -bottom-10 -right-10 w-32 h-32 blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity ${color.replace('text', 'bg')}`} />
            </div>
        </motion.div>
    );
};

const TopStats = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
                label="Civic Impact"
                value="84.2"
                subvalue="+2.4%"
                icon={Activity}
                color="text-accent-cyan"
                delay={0.1}
            />
            <StatCard
                label="Sentiment"
                value="78%"
                subvalue="+0.5%"
                icon={TrendingUp}
                color="text-green-400"
                delay={0.2}
            />
            <StatCard
                label="Infrastructure"
                value="142"
                subvalue="12 Ready"
                icon={Layers}
                color="text-accent-blue"
                delay={0.3}
            />
            <StatCard
                label="Active Alerts"
                value="04"
                subvalue="2 Crit"
                icon={AlertCircle}
                color="text-red-400"
                delay={0.4}
            />
        </div>
    );
};

export default TopStats;
