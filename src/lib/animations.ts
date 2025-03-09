
// Random effects generator for hover elements
document.addEventListener('DOMContentLoaded', () => {
  setupRandomHoverEffects();
  setupCyberBackgrounds();
});

// Add mouse tracking for cyber background effects
function setupCyberBackgrounds() {
  const cyberElements = document.querySelectorAll('.cyber-background-animation');
  
  document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    
    cyberElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width * 100;
      const y = (clientY - rect.top) / rect.height * 100;
      
      element.style.setProperty('--x', `${x}%`);
      element.style.setProperty('--y', `${y}%`);
    });
  });
}

// Setup random hover effects
function setupRandomHoverEffects() {
  const hoverElements = document.querySelectorAll('.hover-random-effect');
  
  const effects = [
    'neon-pulse',
    'glitch-effect',
    'ripple-effect',
    'digital-noise',
    'color-shift'
  ];
  
  const colors = [
    'rgba(0, 255, 255, 0.3)',    // Cyan
    'rgba(255, 0, 255, 0.3)',    // Magenta
    'rgba(0, 255, 0, 0.3)',      // Green
    'rgba(255, 255, 0, 0.3)',    // Yellow
    'rgba(255, 0, 128, 0.3)',    // Pink
    'rgba(128, 0, 255, 0.3)'     // Purple
  ];
  
  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      // Assign random effect
      const randomEffect = effects[Math.floor(Math.random() * effects.length)];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      // Clear previous classes
      element.classList.remove(...effects);
      
      // Apply new effect
      element.classList.add(randomEffect);
      element.style.setProperty('--random-color', randomColor);
      
      // Add temporary animation
      const animationDuration = 300 + Math.random() * 500;
      element.style.animationDuration = `${animationDuration}ms`;
    });
    
    element.addEventListener('mouseleave', () => {
      // Optional: cleanup if needed
    });
  });
}

export { setupRandomHoverEffects, setupCyberBackgrounds };
