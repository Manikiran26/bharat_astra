import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';

function App() {
    const [showDashboard, setShowDashboard] = useState(false);

    return (
        <div className="min-h-screen bg-[#0B1C2D] text-white selection:bg-accent-cyan selection:text-black">
            <AnimatePresence mode="wait">
                {!showDashboard ? (
                    <motion.div
                        key="hero"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                        transition={{ duration: 0.8 }}
                    >
                        <Hero onLaunch={() => setShowDashboard(true)} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Dashboard />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;
