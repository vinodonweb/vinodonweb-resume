import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Video } from 'lucide-react';

function CalendlyPage() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if Calendly script is already loaded
    const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    
    const initializeCalendly = () => {
      if (window.Calendly && window.Calendly.initInlineWidget) {
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/work-vinodsharma23/30min',
          parentElement: document.querySelector('.calendly-inline-widget'),
          prefill: {},
        });
        setIsLoaded(true);
      }
    };

    if (existingScript) {
      // Script already present → directly initialize
      initializeCalendly();
    } else {
      // Load script for the first time
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => {
        // Small delay ensures DOM is ready
        setTimeout(initializeCalendly, 100);
      };
      script.onerror = () => {
        console.error('Failed to load Calendly widget');
      };
      document.body.appendChild(script);
    }

    // Optional cleanup if navigating away
    return () => {
      const widgetContainer = document.querySelector('.calendly-inline-widget');
      if (widgetContainer) widgetContainer.innerHTML = '';
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#141414] text-white min-h-screen font-['Inter']">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 terminal backdrop-blur-xl border-b-0 py-4 px-6 animate-fade-in">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-[#f5c842] hover:text-[#ffd700] transition-all duration-300 code-font hover:-translate-x-1"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>./back-to-home</span>
          </button>

          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Book a 1:1 Call</span>
            </h1>
            <p className="text-gray-400 text-lg code-font">
              $ schedule --session="30min-coffee-chat"
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto animate-slide-up">
            <div className="terminal p-6 text-center">
              <Clock className="w-8 h-8 text-[#f5c842] mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Duration</h3>
              <p className="text-gray-400 text-sm code-font">30 minutes</p>
            </div>

            <div className="terminal p-6 text-center">
              <Video className="w-8 h-8 text-[#f5c842] mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Format</h3>
              <p className="text-gray-400 text-sm code-font">Google Meet</p>
            </div>

            <div className="terminal p-6 text-center">
              <Calendar className="w-8 h-8 text-[#f5c842] mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Topics</h3>
              <p className="text-gray-400 text-sm code-font">Tech, Projects, Collab</p>
            </div>
          </div>

          {/* Calendly Widget */}
          <div className="max-w-5xl mx-auto terminal p-8 animate-slide-up">
            <div className="code-font text-sm text-green-400 mb-4">
              // Select your preferred time slot
            </div>

            {!isLoaded && (
              <div className="text-center text-gray-400 mb-4 code-font text-sm">
                Loading calendar...
              </div>
            )}
            <div
              className="calendly-inline-widget"
              style={{
                minWidth: '320px',
                height: '700px',
              }}
            ></div>
          </div>

          {/* Bottom Info */}
          <div className="text-center mt-8 animate-fade-in">
            <p className="text-gray-500 text-sm code-font">
              💡 You'll receive a confirmation email with the meeting link
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendlyPage;