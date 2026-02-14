import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts';

// Audio imports
import main1 from '../assets/audio/Main1.mp3';
import main2 from '../assets/audio/Main2.mp3';
import main3 from '../assets/audio/Main3.mp3';
import main4 from '../assets/audio/Main4.mp3';
import main5 from '../assets/audio/Main5.mp3';
import main6 from '../assets/audio/Main6.mp3';

const blocks = [
    {
        id: 1,
        title: "💗 About Our Love",
        content: "Your love is not loud, but it is powerful. It feels like peace after chaos. It feels like home after a long journey. The way you care, the way you understand without words… That is the kind of love people search for their whole life.",
        audio: main1
    },
    {
        id: 2,
        title: "✨ Why You Are Special",
        content: "You are special not because you try to be, but because you are effortlessly kind. Your smile fixes my worst days. Your voice calms my overthinking. Your existence itself makes my world better.",
        audio: main2
    },
    {
        id: 3,
        title: "💍 My Promise",
        content: "I may not be perfect. I may make mistakes. But one thing I promise — My love for you is honest, loyal, and forever growing. I choose you today. I will choose you tomorrow. And every day after that.",
        audio: main3
    },
    {
        id: 4,
        title: "🌹 Our Journey",
        content: "We started as strangers. Became friends. Became something beautiful. Every fight made us stronger. Every laugh made us closer. Our story is my favorite story.",
        audio: main4
    },
    {
        id: 5,
        title: "❤️ Why I Love You",
        content: "I love you for your heart. I love you for your strength. I love you for your flaws. I love you for being you. Not perfect. Just real.",
        audio: main5
    },
    {
        id: 6,
        title: "🥺 I'm Sorry",
        content: "If I ever hurt you, I’m truly sorry. Sometimes I fail in words. But my heart never fails in loving you. Thank you for staying. Thank you for believing in us.",
        audio: main6
    }
];

const Main = () => {
    const [currentAudio, setCurrentAudio] = useState(null);
    const [activeId, setActiveId] = useState(null);
    const audioRef = useRef(null);

    const handleViewportEnter = (block) => {
        // Only play if it's not already playing this one
        if (activeId === block.id) return;

        if (audioRef.current) {
            audioRef.current.pause();
        }

        const newAudio = new Audio(block.audio);
        newAudio.play().catch(err => console.log("Audio play blocked", err));
        audioRef.current = newAudio;
        setActiveId(block.id);
    };

    useEffect(() => {
        // Cleanup on unmount
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);

    return (
        <div className="min-h-screen relative overflow-x-hidden bg-pink-50/30">
            <FloatingHearts />

            <div className="max-w-4xl mx-auto relative z-10 py-20 px-6">
                <header className="text-center mb-24">
                    <motion.h1
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-5xl md:text-7xl font-dancing text-rose-600 mb-6"
                    >
                        My Beautiful Love Story
                    </motion.h1>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: 'spring' }}
                        className="text-rose-400"
                    >
                        <span className="text-2xl">Scroll down to read my heart...</span>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="mt-4 text-3xl"
                        >
                            ↓
                        </motion.div>
                    </motion.div>
                </header>

                <div className="flex flex-col space-y-32 mb-40">
                    {blocks.map((block, index) => (
                        <motion.div
                            key={block.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.6 }}
                            onViewportEnter={() => handleViewportEnter(block)}
                            className="relative"
                        >
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className={`glass-card p-10 md:p-16 rounded-[2rem] shadow-2xl border border-white/50 transition-all duration-700 ${activeId === block.id ? ' ring-4 ring-rose-200 bg-white/60 scale-105 shadow-rose-200/50' : 'opacity-80 scale-95'}`}
                            >
                                {activeId === block.id && (
                                    <div className="absolute -top-4 -right-4 bg-rose-500 text-white p-3 rounded-full shadow-lg animate-pulse">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                        </svg>
                                    </div>
                                )}

                                <h2 className="text-3xl md:text-4xl font-dancing font-bold text-rose-600 mb-8 border-b border-rose-100 pb-4">
                                    {block.title}
                                </h2>
                                <p className="text-xl md:text-2xl text-rose-700 leading-relaxed font-poppins italic">
                                    "{block.content}"
                                </p>

                                <div className="mt-8 flex justify-end">
                                    <span className="text-rose-300 font-dancing text-2xl">Forever yours...</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center pb-20"
                >
                    <Link
                        to="/gallery"
                        className="inline-flex items-center space-x-3 px-10 py-4 bg-rose-500 text-white rounded-full shadow-2xl font-semibold text-xl border-4 border-white hover:bg-rose-600 hover:scale-110 transition-all group"
                    >
                        <span>View Our Gallery</span>
                        <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Main;
