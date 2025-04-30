import React, { useState, useEffect } from 'react';
import RainbowButton from './RainbowButton';

const RoleSwitcher = ({ onRoleChange, activeRole }) => {
  const [activeRoleState, setActiveRoleState] = useState(activeRole || 'Full-Stack Developer');
  
  // Update local state when prop changes
  useEffect(() => {
    if (activeRole) {
      setActiveRoleState(activeRole);
    }
  }, [activeRole]);
  
  const roles = [
    'Full-Stack Developer',
    'iOS Developer',
    'Android Developer'
  ];
  
  const handleRoleChange = (role) => {
    // Only update if the role is different
    if (activeRoleState !== role) {
      // Small delay to ensure any animations have time to complete
      setTimeout(() => {
        setActiveRoleState(role);
        onRoleChange(role);
      }, 50);
    }
  };
  
  return (
    <div className="fixed right-4 top-20 z-50 bg-[#1a1a1a] rounded-lg p-3 shadow-lg border border-gray-800">
      <div className="flex flex-col space-y-2">
        {roles.map((role) => (
          <RainbowButton
            key={role}
            onClick={() => handleRoleChange(role)}
            className={
              activeRoleState === role
                ? 'text-white bg-blue-600 border-transparent hover:bg-blue-700'
                : ''
            }
          >
            {role}
          </RainbowButton>
        ))}
      </div>
    </div>
  );
};

export default RoleSwitcher; 