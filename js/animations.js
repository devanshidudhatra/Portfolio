// Animations JavaScript File

document.addEventListener('DOMContentLoaded', () => {
    // Text reveal animation for hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Create matrix-style effect in background
    const createMatrixEffect = () => {
        const canvas = document.createElement('canvas');
        const videoBackground = document.querySelector('.video-background');
        if (!videoBackground) return;
        
        canvas.classList.add('matrix-canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '0';
        canvas.style.opacity = '0.15';
        
        videoBackground.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        
        // Making canvas full screen
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Characters to be used
        const characters = '01';
        
        // Split characters into an array
        const charactersArray = characters.split('');
        
        // Font size
        const fontSize = 14;
        
        // Number of columns for the rain
        const columns = canvas.width / fontSize;
        
        // Array of drops - one per column
        const drops = [];
        
        // x below is the x coordinate
        // 1 = y co-ordinate of the drop (same for every drop initially)
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        // Drawing the characters
        function draw() {
            // Black BG for the canvas
            // Translucent BG to show trail
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Set the color and font
            ctx.fillStyle = '#00cc66'; // Green
            ctx.font = fontSize + 'px monospace';
            
            // Loop over drops
            for (let i = 0; i < drops.length; i++) {
                // Get random character
                const text = charactersArray[Math.floor(Math.random() * charactersArray.length)];
                
                // x = i * fontSize, y = value of drops[i] * fontSize
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                // Sending the drop back to the top randomly after it has crossed the screen
                // Adding randomness to the reset to make the drops scattered on the Y axis
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                // Incrementing Y coordinate
                drops[i]++;
            }
        }
        
        // Loop the animation
        setInterval(draw, 35);
        
        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    };
    
    createMatrixEffect();
    
    // Animate section titles when they come into view
    const sectionTitles = document.querySelectorAll('.section-title');
    
    const animateSectionTitles = () => {
        sectionTitles.forEach(title => {
            const titlePosition = title.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (titlePosition < screenPosition) {
                title.classList.add('animated');
            }
        });
    };
    
    if (sectionTitles.length) {
        // Add CSS for the animation
        const style = document.createElement('style');
        style.textContent = `
            .section-title {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .section-title.animated {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
        
        window.addEventListener('scroll', animateSectionTitles);
        // Initial check
        setTimeout(animateSectionTitles, 500);
    }
    
    // Animated typing effect for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        const typeWriter = () => {
            let i = 0;
            const speed = 50; // typing speed in milliseconds
            
            function type() {
                if (i < text.length) {
                    heroSubtitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            // Start typing after a delay
            setTimeout(type, 1500);
        };
        
        typeWriter();
    }
    
    // Animated scroll down indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transform = 'translateY(20px) translateX(-50%)';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.transform = 'translateY(0) translateX(-50%)';
            }
        });
    }
    
    // Cursor trailing effect
    const createCursorTrail = () => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        document.body.appendChild(trail);
        
        // Add CSS for the cursor trail
        const style = document.createElement('style');
        style.textContent = `
            .cursor-trail {
                position: fixed;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(0,204,102,0.5) 0%, rgba(0,204,102,0) 70%);
                pointer-events: none;
                mix-blend-mode: screen;
                z-index: 9999;
                transform: translate(-50%, -50%);
                transition: width 0.2s, height 0.2s;
                opacity: 0;
            }
        `;
        document.head.appendChild(style);
        
        document.addEventListener('mousemove', (e) => {
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            trail.style.opacity = '1';
            
            // Make the trail larger on hover over interactive elements
            const targetElement = e.target;
            if (targetElement.tagName === 'A' || targetElement.tagName === 'BUTTON' || 
                targetElement.classList.contains('skill-card') || 
                targetElement.classList.contains('project-card')) {
                trail.style.width = '50px';
                trail.style.height = '50px';
            } else {
                trail.style.width = '20px';
                trail.style.height = '20px';
            }
        });
        
        document.addEventListener('mouseout', () => {
            trail.style.opacity = '0';
        });
    };
    
    createCursorTrail();
});