import React, { useState, useEffect } from 'react';
import RainbowButton from './RainbowButton';

const RoleSwitcher = ({ onRoleChange, activeRole }) => {
  const [activeRoleState, setActiveRoleState] = useState(activeRole || 'Software Engineer');
  
  // Update local state when prop changes
  useEffect(() => {
    if (activeRole) {
      setActiveRoleState(activeRole);
    }
  }, [activeRole]);
  
  const roles = [
    'Software Engineer'
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
  
  // Hide role switcher since we only have one role
  return null;
};

export default RoleSwitcher; 