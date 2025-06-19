class CountdownApp {
    constructor() {
        this.countdownElement = document.getElementById('countdown');
        this.statusElement = document.getElementById('status');
        this.clickButton = document.getElementById('clickButton');
        this.popup = document.getElementById('popup');
        this.closePopupButton = document.getElementById('closePopup');
        
        this.totalTime = 60; // 1 minute in seconds
        this.timeLeft = this.totalTime;
        this.isFinished = false;
        this.timer = null;
        
        this.init();
    }
    
    init() {
        this.updateDisplay();
        this.setupEventListeners();
        this.startCountdown();
    }
    
    setupEventListeners() {
        this.clickButton.addEventListener('click', () => this.handleButtonClick());
        this.closePopupButton.addEventListener('click', () => this.closePopup());
        
        // Close popup when clicking outside
        this.popup.addEventListener('click', (e) => {
            if (e.target === this.popup) {
                this.closePopup();
            }
        });
        
        // Close popup with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.popup.classList.contains('show')) {
                this.closePopup();
            }
        });
    }
    
    startCountdown() {
        this.statusElement.textContent = 'Countdown in progress...';
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            if (this.timeLeft <= 0) {
                this.finishCountdown();
            }
        }, 1000);
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        this.countdownElement.textContent = formattedTime;
        
        // Add visual feedback when time is running low
        if (this.timeLeft <= 10 && this.timeLeft > 0) {
            this.countdownElement.style.color = '#FF6B6B';
        }
    }
    
    finishCountdown() {
        clearInterval(this.timer);
        this.isFinished = true;
        
        this.countdownElement.textContent = '00:00';
        this.countdownElement.classList.add('finished');
        this.statusElement.textContent = 'Time\'s up! Click the button to win!';
        
        this.clickButton.disabled = false;
        this.clickButton.classList.add('enabled');
        this.clickButton.textContent = 'Click me to win!';
    }
    
    handleButtonClick() {
        if (this.isFinished) {
            this.showWinnerPopup();
        }
    }
    
    showWinnerPopup() {
        this.popup.classList.add('show');
        
        // Add confetti effect
        this.createConfetti();
    }
    
    closePopup() {
        this.popup.classList.remove('show');
    }
    
    createConfetti() {
        // Simple confetti effect
        const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = '-10px';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '9999';
                confetti.style.borderRadius = '50%';
                
                document.body.appendChild(confetti);
                
                const fallDuration = Math.random() * 3 + 2;
                const rotation = Math.random() * 360;
                
                confetti.animate([
                    {
                        transform: `translateY(-10px) rotate(0deg)`,
                        opacity: 1
                    },
                    {
                        transform: `translateY(100vh) rotate(${rotation}deg)`,
                        opacity: 0
                    }
                ], {
                    duration: fallDuration * 1000,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }).onfinish = () => {
                    confetti.remove();
                };
            }, i * 100);
        }
    }
    
    // Method to reset the countdown (useful for testing)
    reset() {
        clearInterval(this.timer);
        this.timeLeft = this.totalTime;
        this.isFinished = false;
        this.countdownElement.classList.remove('finished');
        this.countdownElement.style.color = '#fff';
        this.clickButton.disabled = true;
        this.clickButton.classList.remove('enabled');
        this.clickButton.textContent = 'Click me';
        this.closePopup();
        this.updateDisplay();
        this.startCountdown();
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.countdownApp = new CountdownApp();
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CountdownApp;
}