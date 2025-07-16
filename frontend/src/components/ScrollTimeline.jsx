import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import '../Scroll.css';

const sections = [
    { title: 'Title 1', subtitle: 'Subtitle 1' },
    { title: 'Title 2', subtitle: 'Subtitle 2' },
    { title: 'Title 3', subtitle: 'Subtitle 3' },
];

export default function ScrollTimeline() {
    const lineRef = useRef(null);
    const containerRef = useRef(null);

    const handleScroll = () => {
        const line = lineRef.current;
        const container = containerRef.current;

        if (!line || !container) return;

        const isWide = window.innerWidth >= 768;
        const rect = container.getBoundingClientRect();
        const totalLength = isWide
            ? container.scrollWidth
            : container.offsetHeight;
        const offset = isWide
            ? window.scrollY + window.innerHeight - container.offsetTop
            : window.scrollY + window.innerHeight - container.offsetTop;

        const percent = Math.min((offset / totalLength) * 100, 100);

        if (isWide) {
            line.style.width = `${percent}%`;
        } else {
            line.style.height = `${percent}%`;
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="timeline-container" ref={containerRef}>
            <div className="timeline-line-container">
                <div className="timeline-line-background" />
                <div className="timeline-line-fill" ref={lineRef} />

                {sections.map((sec, idx) => (
                    <TimelineItem key={idx} title={sec.title} subtitle={sec.subtitle} />
                ))}
            </div>
        </div>
    );
}

function TimelineItem({ title, subtitle }) {
    const ref = useRef(null);
    const inView = useInView(ref, { threshold: 0.5 });
    const controls = useAnimation();

    useEffect(() => {
        if (inView) {
            controls.start({
                scale: 1.1,
                opacity: 1,
                transition: { duration: 0.6, ease: 'easeOut' },
            });
        } else {
            controls.start({ scale: 0.95, opacity: 0.5 });
        }
    }, [inView, controls]);

    return (
        <div className="timeline-section" ref={ref}>
            {/* <div className="timeline-dot" /> */}
            <motion.div className="timeline-content" animate={controls} initial={{ scale: 0.95, opacity: 0.5 }}>
                <h3>{title}</h3>
                <p>{subtitle}</p>
            </motion.div>
        </div>
    );
}
