import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Code, Zap, Heart, Star } from 'lucide-react';

const EasterEggs = () => {
  const [konamiCode, setKonamiCode] = useState([]);
  const [showSecret, setShowSecret] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showCoffee, setShowCoffee] = useState(false);
  const [particles, setParticles] = useState([]);

  // Konami code sequence
  const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];

  // Coffee quote easter egg
  const coffeeQuotes = [
    "☕ Coffee: A programmer's best friend",
    "🚀 Powered by caffeine and determination", 
    "💻 Code quality proportional to coffee intake",
    "⚡ Debugging speed increases with espresso shots"
  ];

  // Konami code detection
  useEffect(() => {
    const handleKeyPress = (e) => {
      const newSequence = [...konamiCode, e.code].slice(-10);
      setKonamiCode(newSequence);
      
      if (newSequence.join(',') === konamiSequence.join(',')) {
        setShowSecret(true);
        createParticleExplosion();
        setTimeout(() => setShowSecret(false), 5000);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [konamiCode]);

  // Coffee counter easter egg
  const handleLogoClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount === 4) { // 5 clicks total
      setShowCoffee(true);
      setTimeout(() => setShowCoffee(false), 3000);
      setClickCount(0);
    }
  };

  // Particle explosion effect
  const createParticleExplosion = () => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      color: ['#f5c842', '#ffd700', '#ff6b6b', '#4ecdc4'][Math.floor(Math.random() * 4)]
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 3000);
  };

  return (
    <>
      {/* Konami Code Secret */}
      <AnimatePresence>
        {showSecret && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="terminal p-8 text-center neon-border"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
            >
              <div className="space-y-4">
                <Zap className="w-16 h-16 text-[#f5c842] mx-auto animate-bounce" />
                <h2 className="text-3xl font-bold gradient-text">🎉 SECRET UNLOCKED! 🎉</h2>
                <p className="code-font text-[#f5c842]">
                  Congratulations! You found the Konami code!
                </p>
                <p className="text-gray-300">
                  "The best way to predict the future is to invent it." - Alan Kay
                </p>
                <div className="flex justify-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coffee Easter Egg */}
      <AnimatePresence>
        {showCoffee && (
          <motion.div
            className="fixed top-20 right-4 z-40 terminal p-4"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
          >
            <div className="flex items-center space-x-3">
              <Coffee className="w-8 h-8 text-[#f5c842] animate-bounce" />
              <div>
                <p className="code-font text-sm text-[#f5c842]">Coffee Mode Activated!</p>
                <p className="text-xs text-gray-400">
                  {coffeeQuotes[Math.floor(Math.random() * coffeeQuotes.length)]}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Particle Explosion */}
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="fixed w-2 h-2 rounded-full pointer-events-none z-30"
            style={{ 
              backgroundColor: particle.color,
              left: particle.x,
              top: particle.y 
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ 
              scale: [0, 1, 0],
              opacity: [1, 1, 0],
              x: [0, (Math.random() - 0.5) * 400],
              y: [0, (Math.random() - 0.5) * 400]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Clickable Heart (more visible) */}
      <motion.div
        onClick={handleLogoClick}
        className="fixed bottom-4 right-4 w-10 h-10 opacity-60 hover:opacity-100 cursor-pointer z-20 transition-all duration-300"
        title="🤔 What happens if you click me 5 times?"
        whileHover={{ scale: 1.2, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          y: [0, -5, 0],
          transition: { duration: 2, repeat: Infinity }
        }}
      >
        <Heart className="w-full h-full text-[#f5c842] drop-shadow-lg" />
        {clickCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#f5c842] text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {clickCount}
          </span>
        )}
      </motion.div>

      {/* Konami Code Hint (more visible) */}
      <motion.div 
        className="fixed bottom-4 left-4 text-xs code-font text-gray-400 opacity-70 hover:opacity-100 transition-opacity cursor-help"
        title="Psst... this is a hint for something special!"
        whileHover={{ scale: 1.05 }}
      >
        <div className="bg-[#0a0a0a]/80 backdrop-blur-sm rounded px-2 py-1 border border-[#f5c842]/20">
          💡 Try: ↑↑↓↓←→←→BA
        </div>
      </motion.div>
    </>
  );
};

export default EasterEggs;
