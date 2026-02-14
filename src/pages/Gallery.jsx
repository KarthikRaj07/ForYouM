import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import galleryAudio from '../assets/audio/Gallery.mp3';

const images = Array.from({ length: 13 }, (_, i) => {
    const index = i + 1;
    const ext = index === 4 ? 'PNG' : 'jpg';
    return {
        id: index,
        src: new URL(`../assets/Photos/${index}.${ext}`, import.meta.url).href,
        alt: `Our Memory ${index}`
    };
});

const Gallery = () => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.4;
            audioRef.current.play().catch(err => console.log("Autoplay blocked", err));
        }
    }, []);

    return (
        <div className="min-h-screen relative overflow-x-hidden p-4 md:p-12 pb-32 bg-pink-50/20">
            <audio ref={audioRef} src={galleryAudio} loop />

            <div className="max-w-2xl mx-auto relative z-10">
                <header className="text-center mb-16 pt-10">
                    <Link to="/main" className="text-rose-400 hover:text-rose-600 mb-6 inline-flex items-center space-x-1 font-medium transition-all hover:-translate-x-1">
                        <span>←</span> <span>Back to Our Story</span>
                    </Link>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-5xl md:text-6xl font-dancing text-rose-600 mb-4"
                    >
                        Our Precious Memories
                    </motion.h1>
                    <p className="text-rose-400 font-poppins text-sm md:text-base">
                        Every picture tells a story of us...
                    </p>
                </header>

                <div className="flex flex-col space-y-12 md:space-y-20">
                    {images.map((img, index) => (
                        <motion.div
                            key={img.id}
                            initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -2 : 2 }}
                            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8 }}
                            className="group relative"
                        >
                            <div className="bg-white p-3 pb-12 shadow-2xl rounded-sm transform transition-transform group-hover:scale-[1.02] border border-rose-100">
                                <div className="aspect-[4/5] overflow-hidden rounded-sm">
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <div className="absolute bottom-4 left-0 right-0 text-center">
                                    <span className="font-dancing text-2xl text-rose-400">Memory #{img.id}</span>
                                </div>

                                {/* Decorative heart */}
                                <div className="absolute -top-3 -right-3 bg-white p-2 rounded-full shadow-lg text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="text-center mt-20"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                >
                    <p className="font-dancing text-4xl text-rose-600 mb-8">And many more to come... ❤️</p>
                    <Link
                        to="/"
                        className="text-rose-400 hover:text-rose-600 font-medium underline underline-offset-4"
                    >
                        Back to beginning
                    </Link>
                </motion.div>
            </div>

            <div className="fixed bottom-6 right-6 z-20 md:bottom-10 md:right-10">
                <div className="bg-white/90 backdrop-blur-md p-3 px-5 rounded-full flex items-center space-x-2 shadow-2xl border border-rose-100">
                    <span className="animate-pulse text-xl">🎵</span>
                    <span className="text-rose-500 font-medium text-xs md:text-sm uppercase tracking-wider">Memory Lane</span>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
