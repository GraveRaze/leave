class AnniversaryApp {
    constructor() {
        this.currentPage = 1;
        this.totalPages = 5; // increased to include gallery and final celebration
        this.typingText = "Every love story is beautiful, but ours is my favorite 💖";
        this.typingIndex = 0;
        this.typingSpeed = 40;
        this.isTyping = false;
        this.maxHearts = 8;
        this.activeHearts = 0;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startTypingAnimation();
        this.startFloatingHearts();
        this.setupNameInput();
    }

    setupEventListeners() {
        const prevButtons = document.querySelectorAll('.nav-prev');
        const nextButtons = document.querySelectorAll('.nav-next');

        prevButtons.forEach(btn => {
            btn.addEventListener('click', () => this.previousPage());
        });

        nextButtons.forEach(btn => {
            btn.addEventListener('click', () => this.nextPage());
        });
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.changePage(this.currentPage + 1);
        }
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.changePage(this.currentPage - 1);
        }
    }

    changePage(pageNumber) {
        const currentPageEl = document.querySelector(`.page-${this.currentPage}`);
        const nextPageEl = document.querySelector(`.page-${pageNumber}`);

        if (currentPageEl && nextPageEl) {
            currentPageEl.classList.remove('active');
            nextPageEl.classList.add('active');
            this.currentPage = pageNumber;
            this.updateNavigationButtons();
            window.scrollTo(0, 0);

            // celebrate when we reach the last page
            if (pageNumber === this.totalPages) {
                this.triggerCelebration();
            }
        }
    }

    updateNavigationButtons() {
        const prevButtons = document.querySelectorAll('.nav-prev');
        const nextButtons = document.querySelectorAll('.nav-next');

        prevButtons.forEach(btn => {
            btn.disabled = this.currentPage === 1;
        });

        nextButtons.forEach(btn => {
            btn.disabled = this.currentPage === this.totalPages;
        });
    }

    startTypingAnimation() {
        const typingTextEl = document.querySelector('.typing-text');
        if (!typingTextEl) return;

        const typeCharacter = () => {
            if (this.typingIndex < this.typingText.length) {
                typingTextEl.textContent += this.typingText[this.typingIndex];
                this.typingIndex++;
                setTimeout(typeCharacter, this.typingSpeed);
            }
        };

        typeCharacter();
    }

    setupNameInput() {
        const nameInput = document.getElementById('nameInput');
        const personalizedGreeting = document.getElementById('personalizedGreeting');

        if (nameInput && personalizedGreeting) {
            nameInput.addEventListener('input', (e) => {
                const name = e.target.value.trim();
                if (name) {
                    personalizedGreeting.textContent = `Dear ${name}, you make every day special! 💕`;
                } else {
                    personalizedGreeting.textContent = '';
                }
            });
        }
    }

    startFloatingHearts() {
        const container = document.querySelector('.hearts-container');
        if (!container) return;

        const createHeart = () => {
            if (this.activeHearts < this.maxHearts) {
                const heart = document.createElement('div');
                heart.className = 'floating-heart';
                heart.textContent = '❤️';

                const randomLeft = Math.random() * 100;
                const randomDuration = 3 + Math.random() * 3;

                heart.style.left = randomLeft + '%';
                heart.style.bottom = '-50px';
                heart.style.animationDuration = randomDuration + 's';
                heart.style.setProperty('--duration', randomDuration + 's');

                container.appendChild(heart);
                this.activeHearts++;

                setTimeout(() => {
                    heart.remove();
                    this.activeHearts--;
                }, randomDuration * 1000);
            }
        };

        setInterval(createHeart, 800);
    }

    triggerCelebration() {
        const confettiContainer = document.getElementById('confetti');
        if (!confettiContainer) return;

        confettiContainer.innerHTML = '';

        const confettiEmojis = ['🎉', '✨', '💕', '🎊', '💖', '🌟', '❤️', '💑'];
        const confettiCount = 40;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.textContent = confettiEmojis[i % confettiEmojis.length];

            const randomLeft = Math.random() * 100;
            const randomDelay = Math.random() * 0.3;
            const randomDuration = 2.5 + Math.random() * 0.8;

            confetti.style.left = randomLeft + '%';
            confetti.style.top = '-20px';
            confetti.style.animationDelay = randomDelay + 's';
            confetti.style.animationDuration = randomDuration + 's';

            confettiContainer.appendChild(confetti);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AnniversaryApp();
});
