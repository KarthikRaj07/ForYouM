import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import landAudio from '../assets/audio/Land.mp3';

const Landing = () => {
    const audioRef = useRef(null);
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [step, setStep] = useState(0); // 0: Name, 1-6: Questions
    const [formData, setFormData] = useState({
        name: '',
        love_scale: 10,
        special_moment: '',
        who_fell_first: '',
        favorite_memory: '',
        dream_trip: '',
        stay_forever: ''
    });

    const startJourney = async () => {
        // Attempt to play audio on first interaction
        if (audioRef.current) {
            try {
                audioRef.current.volume = 0.5;
                await audioRef.current.play();
            } catch (err) {
                console.log("Audio failed to play", err);
            }
        }
        setHasStarted(true);
    };

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
        if (step === 0 && !formData.name) return;
        setStep(prev => prev + 1);
    };

    const prevStep = () => {
        setStep(prev => prev - 1);
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setIsSubmitting(true);

        try {
            await fetch("https://formsubmit.co/ajax/999karthikraj@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            navigate('/main');
        } catch (error) {
            navigate('/main');
        } finally {
            setIsSubmitting(false);
        }
    };

    const steps = [
        {
            title: "Welcome, My Love",
            content: (
                <div className="space-y-4">
                    <p className="text-rose-400 italic">Before we begin, tell me your lovely name...</p>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        placeholder="Your name here..."
                        className="w-full px-4 py-3 rounded-2xl border-2 border-rose-100 focus:border-rose-300 focus:outline-none bg-white/70 text-center text-xl text-rose-600"
                        autoFocus
                    />
                </div>
            )
        },
        {
            title: "Q1: A Little Test 😌",
            content: (
                <div className="space-y-6">
                    <p className="text-rose-500 font-medium">On a scale of 1–10, how much do you love me?</p>
                    <div className="flex flex-col items-center space-y-4">
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={formData.love_scale}
                            onChange={(e) => updateField('love_scale', e.target.value)}
                            className="w-full h-3 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-rose-500"
                        />
                        <span className="text-4xl font-bold text-rose-600">{formData.love_scale}</span>
                    </div>
                </div>
            )
        },
        {
            title: "Q2: Hearts Touching",
            content: (
                <div className="space-y-4 text-left">
                    <p className="text-rose-500 font-medium">What was the moment you felt I was special to you?</p>
                    <textarea
                        value={formData.special_moment}
                        onChange={(e) => updateField('special_moment', e.target.value)}
                        rows="4"
                        placeholder="Tell me your heart's secret..."
                        className="w-full px-4 py-3 rounded-2xl border-2 border-rose-100 focus:border-rose-300 focus:outline-none bg-white/70 resize-none"
                    />
                </div>
            )
        },
        {
            title: "Q3: The Beginning 😏",
            content: (
                <div className="space-y-4">
                    <p className="text-rose-500 font-medium">Who fell in love first?</p>
                    <div className="grid grid-cols-1 gap-3">
                        {["You", "Me", "Both at same time", "Still thinking 😜"].map(option => (
                            <button
                                key={option}
                                onClick={() => { updateField('who_fell_first', option); nextStep(); }}
                                className={`py-3 px-6 rounded-2xl border-2 transition-all ${formData.who_fell_first === option ? 'bg-rose-500 text-white border-rose-500' : 'bg-white/50 border-rose-100 text-rose-600 hover:bg-rose-50'}`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            ),
            hideNext: true
        },
        {
            title: "Q4: Sweet Relic",
            content: (
                <div className="space-y-4 text-left">
                    <p className="text-rose-500 font-medium">What is your favorite memory of us?</p>
                    <textarea
                        value={formData.favorite_memory}
                        onChange={(e) => updateField('favorite_memory', e.target.value)}
                        rows="4"
                        placeholder="A moment you'll never forget..."
                        className="w-full px-4 py-3 rounded-2xl border-2 border-rose-100 focus:border-rose-300 focus:outline-none bg-white/70 resize-none"
                    />
                </div>
            )
        },
        {
            title: "Q5: Beyond Horizons 🌍",
            content: (
                <div className="space-y-4 text-left">
                    <p className="text-rose-500 font-medium">Where should we go on our dream trip together?</p>
                    <input
                        type="text"
                        value={formData.dream_trip}
                        onChange={(e) => updateField('dream_trip', e.target.value)}
                        placeholder="E.g. Paris, Maldives, or just home..."
                        className="w-full px-4 py-3 rounded-2xl border-2 border-rose-100 focus:border-rose-300 focus:outline-none bg-white/70"
                    />
                </div>
            )
        },
        {
            title: "Q6: One Last Wish ❤️",
            content: (
                <div className="space-y-4">
                    <p className="text-rose-500 font-medium text-xl">Will you stay with me forever?</p>
                    <div className="grid grid-cols-1 gap-3">
                        {["Yes", "Obviously yes", "Forever and ever", "Always ❤️"].map(option => (
                            <button
                                key={option}
                                onClick={() => { updateField('stay_forever', option); }}
                                className={`py-3 px-6 rounded-2xl border-2 transition-all ${formData.stay_forever === option ? 'bg-rose-600 text-white border-rose-600 shadow-lg' : 'bg-white/50 border-rose-100 text-rose-600 hover:bg-rose-50'}`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-pink-50/10 transition-colors duration-1000">
            <audio ref={audioRef} src={landAudio} loop />

            <AnimatePresence>
                {!hasStarted ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        className="z-50 text-center"
                    >
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={startJourney}
                            className="bg-white/80 p-8 rounded-full shadow-2xl border-2 border-rose-200 group"
                        >
                            <span className="text-5xl block group-hover:animate-pulse">❤️</span>
                            <span className="text-rose-500 font-dancing text-2xl mt-4 block">Touch to Open</span>
                        </motion.button>
                    </motion.div>
                ) : (
                    <>
                        <div className="absolute top-8 left-0 right-0 text-center z-10">
                            <div className="flex justify-center space-x-2">
                                {steps.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-1.5 rounded-full transition-all duration-500 ${step >= i ? 'bg-rose-500 w-8' : 'bg-rose-200 w-4'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4 }}
                            className="glass-card p-10 py-12 rounded-[2.5rem] shadow-2xl max-w-md w-full z-10 text-center border-white/60"
                        >
                            <h2 className="text-3xl font-dancing font-bold text-rose-600 mb-8">
                                {steps[step].title}
                            </h2>

                            <div className="mb-10 min-h-[160px] flex flex-col justify-center">
                                {steps[step].content}
                            </div>

                            <div className="flex space-x-4">
                                {step > 0 && (
                                    <button
                                        onClick={prevStep}
                                        className="w-1/3 py-4 bg-white/50 text-rose-400 rounded-2xl font-bold hover:bg-white/80 transition-all border border-rose-100"
                                    >
                                        Back
                                    </button>
                                )}

                                {step < steps.length - 1 ? (
                                    !steps[step].hideNext && (
                                        <button
                                            onClick={nextStep}
                                            disabled={step === 0 && !formData.name}
                                            className={`flex-1 py-4 bg-rose-500 text-white rounded-2xl font-bold shadow-lg hover:bg-rose-600 transition-all ${step === 0 && !formData.name ? 'opacity-50 grayscale' : ''}`}
                                        >
                                            Continue →
                                        </button>
                                    )
                                ) : (
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting || !formData.stay_forever}
                                        className={`flex-1 py-4 bg-rose-600 text-white rounded-2xl font-bold shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:bg-rose-700 transition-all flex items-center justify-center space-x-2 ${(!formData.stay_forever || isSubmitting) ? 'opacity-50 grayscale' : ''}`}
                                    >
                                        {isSubmitting ? (
                                            <span className="animate-spin text-2xl">⏳</span>
                                        ) : (
                                            <><span>Complete & Send Love</span> <span>💌</span></>
                                        )}
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <div className="fixed bottom-10 opacity-30 pointer-events-none">
                <p className="font-dancing text-2xl text-rose-300 italic">For my forever Valentine...</p>
            </div>
        </div>
    );
};

export default Landing;
