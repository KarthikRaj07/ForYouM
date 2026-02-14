import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-6 py-3 bg-white/70 backdrop-blur-lg rounded-full border border-white/50 shadow-[0_8px_32px_rgba(251,113,133,0.3)] min-w-[200px]">
            <div className="flex items-center justify-around space-x-8">
                <NavLink
                    to="/main"
                    className={({ isActive }) =>
                        `text-sm md:text-base font-medium transition-all duration-300 flex flex-col items-center ${isActive ? 'text-rose-600 scale-110' : 'text-rose-400 hover:text-rose-500'}`
                    }
                >
                    <span className="text-xl mb-0.5">📖</span>
                    <span className="text-[10px] md:text-xs uppercase font-bold tracking-tighter">Story</span>
                </NavLink>

                <div className="w-1.5 h-1.5 bg-rose-200 rounded-full"></div>

                <NavLink
                    to="/gallery"
                    className={({ isActive }) =>
                        `text-sm md:text-base font-medium transition-all duration-300 flex flex-col items-center ${isActive ? 'text-rose-600 scale-110' : 'text-rose-400 hover:text-rose-500'}`
                    }
                >
                    <span className="text-xl mb-0.5">📸</span>
                    <span className="text-[10px] md:text-xs uppercase font-bold tracking-tighter">Gallery</span>
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
