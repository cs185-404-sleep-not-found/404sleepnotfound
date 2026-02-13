document.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, 0);

    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const teamSection = document.querySelector('#team');
            if (teamSection) {
                teamSection.scrollIntoView({ behavior: 'smooth' });
            }
        });

        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', () => {
                const heroBottom = hero.offsetTop + hero.offsetHeight - 200;
                if (window.pageYOffset > heroBottom) {
                    scrollIndicator.style.opacity = '0';
                    scrollIndicator.style.pointerEvents = 'none';
                } else {
                    scrollIndicator.style.opacity = '1';
                    scrollIndicator.style.pointerEvents = 'auto';
                }
            });
        }
    }

    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const hero = document.querySelector('.hero');
    const teamSection = document.querySelector('.team');
    const deliverablesSection = document.querySelector('.deliverables');

    function parallaxScroll() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;

        if (hero && scrolled < window.innerHeight * 1.5) {
            hero.style.transform = `translateY(${rate}px)`;
        }

        if (teamSection && scrolled > teamSection.offsetTop - window.innerHeight) {
            const teamOffset = (scrolled - (teamSection.offsetTop - window.innerHeight)) * -0.05;
            teamSection.style.transform = `translateY(${teamOffset}px)`;
        }

        if (deliverablesSection && scrolled > deliverablesSection.offsetTop - window.innerHeight) {
            const deliverableOffset = (scrolled - (deliverablesSection.offsetTop - window.innerHeight)) * -0.02;
            deliverablesSection.style.transform = `translateY(${deliverableOffset}px)`;
        }
    }

    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(parallaxScroll);
            ticking = true;
        }
    }

    function resetTick() {
        ticking = false;
    }

    window.addEventListener('scroll', requestTick);

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 80);
            }
        });
    }, observerOptions);

    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(40px)';
        title.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(title);
    });

    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(60px) scale(0.95)';
        card.style.transition = `all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.15}s`;
        observer.observe(card);
    });

    const deliverableCards = document.querySelectorAll('.deliverable-card');
    deliverableCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) scale(0.98)';
        card.style.transition = `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.08}s`;
        observer.observe(card);
    });

    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDesc = document.querySelector('.hero-desc');

    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(50px)';
        heroTitle.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }

    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(30px)';
        heroSubtitle.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        setTimeout(() => {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 600);
    }

    if (heroDesc) {
        heroDesc.style.opacity = '0';
        heroDesc.style.transform = 'translateY(20px)';
        heroDesc.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        setTimeout(() => {
            heroDesc.style.opacity = '1';
            heroDesc.style.transform = 'translateY(0)';
        }, 900);
    }

    if (scrollIndicator) {
        setTimeout(() => {
            scrollIndicator.style.opacity = '1';
        }, 1400); 
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            window.removeEventListener('scroll', requestTick);
            if (hero) hero.style.transform = 'none';
            if (teamSection) teamSection.style.transform = 'none';
            if (deliverablesSection) deliverablesSection.style.transform = 'none';
        } else {
            window.addEventListener('scroll', requestTick);
        }
    });

    if (window.innerWidth <= 768) {
        window.removeEventListener('scroll', requestTick);
    }

    window.addEventListener('beforeunload', () => {
        window.scrollTo(0, 0);
    });

    setTimeout(() => {
        if (window.pageYOffset > 0) {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    }, 100);
});