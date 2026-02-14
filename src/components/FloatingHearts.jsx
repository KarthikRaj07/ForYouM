import React, { useEffect, useState } from 'react';

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const heart = {
        id: Date.now(),
        left: Math.random() * 100,
        size: Math.random() * (30 - 10) + 10,
        duration: Math.random() * (15 - 5) + 5,
        delay: Math.random() * 5,
      };

      setHearts((prev) => [...prev.slice(-20), heart]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart"
          style={{
            left: `${heart.left}%`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            bottom: '-50px',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
