        // Init Lucide Icons
        lucide.createIcons();

        // Reveal Animations on Scroll
        document.addEventListener("DOMContentLoaded", () => {
            const once = true; // Animate only once per element
            if (!window.__inViewIO) {
              window.__inViewIO = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    entry.target.classList.add("animate");
                    if (once) window.__inViewIO.unobserve(entry.target);
                  }
                });
              }, { threshold: 0.1, rootMargin: "0px -10% 0px -10%" });
            }

            document.querySelectorAll(".animate-on-scroll").forEach((el) => {
                window.__inViewIO.observe(el); 
            });

            // Flashlight Effect Tracking for Hero Background
            document.querySelectorAll('.hero-flashlight').forEach((section) => {
                const glow = section.querySelector('.hero-glow');
                if(!glow) return;
                section.addEventListener('mousemove', (e) => {
                    const rect = section.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    glow.style.setProperty('--mouse-x', `${x}px`);
                    glow.style.setProperty('--mouse-y', `${y}px`);
                    glow.style.opacity = '1';
                });
                section.addEventListener('mouseleave', () => {
                    glow.style.opacity = '0';
                });
            });

            // ====== TIMELINE SCROLL ANIMATION ======
            const timelineContainer = document.getElementById('timeline-container');
            const timelineProgress = document.getElementById('timeline-progress');
            const timelineItems = document.querySelectorAll('.timeline-item');

            function updateTimeline() {
                if (!timelineContainer || !timelineProgress) return;

                const containerRect = timelineContainer.getBoundingClientRect();
                const containerHeight = timelineContainer.offsetHeight;
                const windowH = window.innerHeight;

                // How far into the container we've scrolled (0 â†’ 1)
                const scrolled = Math.max(0, Math.min(1,
                    (windowH * 0.6 - containerRect.top) / containerHeight
                ));

                // Grow the progress line
                timelineProgress.style.height = (scrolled * 100) + '%';

                // Activate each module card as the line reaches it
                timelineItems.forEach((item) => {
                    const itemRect = item.getBoundingClientRect();
                    const itemMidY = itemRect.top + itemRect.height / 2;

                    if (itemMidY < windowH * 0.75) {
                        item.classList.add('is-active');
                        item.classList.remove('opacity-0', 'translate-y-8');
                    }
                });
            }

            window.addEventListener('scroll', updateTimeline, { passive: true });
            updateTimeline(); // Run once on load

            // Card flashlight for dark module cards (dark bg, different radial)
            document.querySelectorAll('.timeline-item .glass-card').forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const r = card.getBoundingClientRect();
                    card.style.setProperty('--mouse-x', (e.clientX - r.left) + 'px');
                    card.style.setProperty('--mouse-y', (e.clientY - r.top) + 'px');
                });
            });

            // ====== 3D BOOK TILT ANIMATION ======
            const bookWrap = document.getElementById('bonus-book-wrap');
            const bookTilt = document.getElementById('book-tilt');

            if (bookWrap && bookTilt) {
                bookWrap.addEventListener('mousemove', (e) => {
                    const rect = bookWrap.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (centerY - y) / 10;
                    const rotateY = (x - centerX) / 10;
                    
                    bookTilt.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                });
                
                bookWrap.addEventListener('mouseleave', () => {
                    bookTilt.style.transform = 'rotateX(0deg) rotateY(0deg)';
                });
            }

            // Scroll Progress Bar
            const progressBar = document.getElementById('scroll-progress');
            if (progressBar) {
                window.addEventListener('scroll', () => {
                    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    const scrolled = (winScroll / height);
                    progressBar.style.transform = `scaleX(${scrolled})`;
                });
            }

        });
    

