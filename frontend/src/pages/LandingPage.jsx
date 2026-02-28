import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MagneticButton from '../components/ui/MagneticButton';

const LandingPage = () => {
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();

    // Parallax effects for different layers
    const yText = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    return (
        <div className="relative min-h-[200vh] w-full text-white overflow-x-hidden">
            {/* Hero Section */}
            <motion.section
                className="h-screen w-full flex flex-col items-center justify-center relative px-4"
                style={{ opacity: opacityHero, y: yText }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="text-center z-10"
                >
                    <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-emerald-200 to-white drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                        LOCKED IN
                    </h1>
                    <p className="text-xl md:text-2xl text-emerald-100/70 mb-10 max-w-2xl mx-auto font-light tracking-wide">
                        The immersive productivity ecosystem.
                        Elevate your focus with dynamic 3D environments and real-time multiplayer lobbies.
                    </p>

                    <MagneticButton
                        onClick={() => navigate('/dashboard')}
                        className="mx-auto rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-white px-8 py-4 font-bold text-lg hover:bg-white/15 hover:border-emerald-400/50 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]"
                    >
                        Enter the Zone
                    </MagneticButton>
                </motion.div>
            </motion.section>

            {/* Feature Section */}
            <section className="min-h-screen w-full flex items-center justify-center px-4 relative z-10">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="glass-panel p-10 flex flex-col justify-center"
                    >
                        <h2 className="text-4xl font-bold mb-4 text-emerald-300">Synchronized Focus</h2>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            Create secure, 6-digit lobbies. Join friends in beautifully rendered 3D environments where your aesthetic reacts to your workflow. Rest when they rest. Focus when they focus.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="glass-panel p-10 flex flex-col justify-center"
                    >
                        <h2 className="text-4xl font-bold mb-4 text-emerald-300">Hyper-Immersive</h2>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            Why stare at a flat screen? Our React Three Fiber engine powers stunning parallax backgrounds, dynamic lighting, and orbital models that bring your productivity to life.
                        </p>
                    </motion.div>

                </div>
            </section>
        </div>
    );
};

export default LandingPage;
