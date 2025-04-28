import React from 'react';
import { LucideIcon } from 'lucide-react';

const ExperienceSection = () => {
  return (
    <div className="experience-section bg-gray-900 text-white p-8">
      <h2 className="text-3xl font-bold mb-4">Experience</h2>
      <div className="experience-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="experience-card bg-gray-800 p-4 rounded-lg shadow-lg">
          <LucideIcon name="code" className="text-blue-500 w-8 h-8 mb-2" />
          <h3 className="text-xl font-semibold">Software Developer</h3>
          <p className="mt-2">Developed various applications using modern technologies.</p>
        </div>
        {/* Add more experience cards as needed */}
      </div>
    </div>
  );
};

export default ExperienceSection; 