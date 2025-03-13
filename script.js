
function toggleMenu(hamburger) { 
    document.getElementById('nav-menu').classList.toggle('active');
    document.getElementById('menu-backdrop').classList.toggle('active');
    hamburger.classList.toggle('active');
}

function closeMenu() {
    document.getElementById('nav-menu').classList.remove('active');
    document.getElementById('menu-backdrop').classList.remove('active');
    document.querySelector('.hamburger').classList.remove('active');
}


    // Function to animate counting up to a number
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16); // 16ms is roughly 60fps
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                clearInterval(timer);
                start = target;
            }
            // If target is an integer, don't show decimals
            if (Number.isInteger(target)) {
                element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
            } else {
                element.textContent = start.toFixed(1) + (element.textContent.includes('+') ? '+' : '');
            }
        }, 16);
    }

    // Set up Intersection Observer to trigger the animation when stats are visible
    document.addEventListener('DOMContentLoaded', function() {
        const statsSection = document.querySelector('.stats-section');
        const statNumbers = document.querySelectorAll('.stat-number');
        
        // Track if animation has already run
        let animationTriggered = false;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // If stats section is in view and animation hasn't run yet
                if (entry.isIntersecting && !animationTriggered) {
                    statNumbers.forEach(statNumber => {
                        // Extract target number from the content
                        let targetText = statNumber.textContent;
                        let hasPlus = targetText.includes('+');
                        let targetNum = parseInt(targetText.replace(/\D/g, ''));
                        
                        // Reset to zero before starting animation
                        statNumber.textContent = "0" + (hasPlus ? '+' : '');
                        
                        // Start animation with 1.5 second duration
                        animateCounter(statNumber, targetNum, 1500);
                    });
                    
                    // Set flag so animation only runs once
                    animationTriggered = true;
                    
                    // Unobserve after animation has been triggered
                    observer.unobserve(statsSection);
                }
            });
        }, {
            threshold: 0.3 // Trigger when 30% of the section is visible
        });
        
        // Start observing the stats section
        observer.observe(statsSection);
    });





