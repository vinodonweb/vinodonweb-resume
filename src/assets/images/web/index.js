// Create a placeholder function with customizable colors and text
const createPlaceholder = (text, bgColor = '#3f4853', textColor = '#ffffff') => {
  // Use 16:9 aspect ratio which is common for screenshots (800×450)
  return `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450" preserveAspectRatio="none"%3E%3Cdefs%3E%3Cstyle type="text/css"%3E%23holder text %7B fill: ${textColor}; font-family: sans-serif; font-weight: 400; font-size: 28px; %7D%3C/style%3E%3C/defs%3E%3Cg id="holder"%3E%3Crect width="100%25" height="100%25" fill="${bgColor}"%3E%3C/rect%3E%3Cg%3E%3Ctext x="50%25" y="50%25" id="holder" dy=".3em" text-anchor="middle"%3E${text}%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E`;
};

// Generate different placeholders for variety
const web1 = createPlaceholder('Website Screenshot 1', '#2a4365');
const web2 = createPlaceholder('Website Screenshot 2', '#2c5282');
const web3 = createPlaceholder('Website Screenshot 3', '#2b6cb0');
const web4 = createPlaceholder('Website Screenshot 4', '#3182ce');

const pm1 = createPlaceholder('Project Management 1', '#44337a');
const pm2 = createPlaceholder('Project Management 2', '#553c9a');
const pm3 = createPlaceholder('Project Management 3', '#6b46c1');

// Export image assets for web projects
export { 
  web1,
  web2,
  web3,
  web4,
  pm1,
  pm2,
  pm3
}; 