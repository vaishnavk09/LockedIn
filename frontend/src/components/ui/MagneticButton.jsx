import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const MagneticButton = ({ children, className, onClick, ...props }) => {
    const ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Smooth springs for the magnetic pull
    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const x = useSpring(0, springConfig);
    const y = useSpring(0, springConfig);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { width, height, left, top } = ref.current.getBoundingClientRect();

        // Calculate distance from center
        const xPos = clientX - (left + width / 2);
        const yPos = clientY - (top + height / 2);

        // Set translation (magnetic effect strength)
        x.set(xPos * 0.3);
        y.set(yPos * 0.3);
    };

    const handleMouseEnter = () => setIsHovered(true);

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            className={`relative flex items-center justify-center ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{ x, y }}
            whileTap={{ scale: 0.95 }}
            {...props}
        >
            <motion.div
                className="pointer-events-none absolute inset-0 z-0 bg-lockedin-primary/20 blur-xl rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1.2 : 0.8 }}
                transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
};

export default MagneticButton;
