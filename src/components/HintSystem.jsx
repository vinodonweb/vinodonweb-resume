import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, Lightbulb, Gamepad2, Coffee, Download } from 'lucide-react';

const HintSystem = () => {
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [hasSeenHints, setHasSeenHints] = useState(false);

  const hints = [
    {
      icon: Gamepad2,
      title: "Secret Code",
      description: "Try the classic gamer sequence: ↑↑↓↓←→←→BA",
      tip: "Use your keyboard arrows and letters!"
    },
    {
      icon: Coffee,
      title: "Coffee Break",
      description: "Find the heart icon and click it 5 times for a caffeine surprise!",
      tip: "Look at the bottom-right corner"
    },
    {
      icon: Download,
      title: "Resume Ready",
      description: "My resume is just one click away in the contact section",
      tip: "Perfect for busy recruiters!"
    }
  ];

  // Show hints automatically after 10 seconds if first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('portfolio-visited');
    if (!hasVisited) {
      const timer = setTimeout(() => {
        setShowHints(true);
        localStorage.setItem('portfolio-visited', 'true');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, []);

  const nextHint = () => {
    setCurrentHint((prev) => (prev + 1) % hints.length);
  };

  const prevHint = () => {
    setCurrentHint((prev) => (prev - 1 + hints.length) % hints.length);
  };

  return (
    <>
      {/* Floating Help Button */}
      <motion.button
        onClick={() => setShowHints(true)}
        className="fixed top-20 right-4 z-40 w-12 h-12 bg-[#f5c842] rounded-full flex items-center justify-center shadow-lg hover:bg-[#ffd700] transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Need help? Click for hints!"
      >
        <HelpCircle className="w-6 h-6 text-black" />
      </motion.button>

      {/* Hints Modal */}
      <AnimatePresence>
        {showHints && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="terminal p-8 max-w-md mx-4 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <button
                onClick={() => setShowHints(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-6">
                <div className="flex items-center justify-center space-x-2">
                  <Lightbulb className="w-6 h-6 text-[#f5c842]" />
                  <h3 className="text-xl font-bold text-[#f5c842] code-font">Portfolio Secrets</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    {React.createElement(hints[currentHint].icon, { 
                      className: "w-12 h-12 text-[#f5c842] mb-2" 
                    })}
                  </div>
                  
                  <h4 className="text-lg font-semibold text-white">
                    {hints[currentHint].title}
                  </h4>
                  
                  <p className="text-gray-300 text-sm">
                    {hints[currentHint].description}
                  </p>
                  
                  <div className="bg-[#f5c842]/10 rounded-lg p-3">
                    <p className="text-[#f5c842] text-xs code-font">
                      💡 {hints[currentHint].tip}
                    </p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={prevHint}
                    className="px-3 py-1 bg-[#f5c842]/20 hover:bg-[#f5c842]/30 rounded text-sm code-font"
                  >
                    ← Prev
                  </button>
                  
                  <div className="flex space-x-2">
                    {hints.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === currentHint ? 'bg-[#f5c842]' : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <button
                    onClick={nextHint}
                    className="px-3 py-1 bg-[#f5c842]/20 hover:bg-[#f5c842]/30 rounded text-sm code-font"
                  >
                    Next →
                  </button>
                </div>

                <button
                  onClick={() => setShowHints(false)}
                  className="w-full py-2 bg-[#f5c842] hover:bg-[#ffd700] text-black font-medium rounded transition-colors"
                >
                  Let's Explore!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HintSystem;
