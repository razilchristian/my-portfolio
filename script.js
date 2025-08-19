// Smooth scroll & active nav highlight
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        document.querySelector(link.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
    });
});
window.addEventListener("scroll", () => {
    document.querySelectorAll("section, .parallax-section").forEach(section => {
        let link = document.querySelector(`nav a[href="#${section.id}"]`);
        if (window.scrollY >= section.offsetTop - 100 && window.scrollY < section.offsetTop + section.offsetHeight) {
            document.querySelectorAll("nav a").forEach(a => a.classList.remove("active"));
            link.classList.add("active");
        }
    });
});

// Reveal on scroll
function reveal() {
    document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.85) el.classList.add('active');
    });
}
window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// ===== Skills progress animation with percentage counter =====
function animateSkills() {
    document.querySelectorAll('.progress').forEach(bar => {
        const trigger = window.innerHeight * 0.9;
        const percentElem = bar.closest('.skill').querySelector('.percent');
        const targetPercent = parseInt(bar.dataset.width);

        if (bar.getBoundingClientRect().top < trigger && !bar.classList.contains('done')) {
            bar.classList.add('done'); // prevent re-trigger
            bar.style.width = bar.dataset.width;

            // Animate counter
            let current = 0;
            let interval = setInterval(() => {
                if (current <= targetPercent) {
                    percentElem.textContent = current + "%";
                    current++;
                } else {
                    clearInterval(interval);
                }
            }, 20);
        }
    });
}
window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);


// Project modal
const modal = document.getElementById('projectModal');
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        document.getElementById('modalImg').src = card.dataset.img;
        document.getElementById('modalTitle').textContent = card.dataset.title;
        document.getElementById('modalDesc').textContent = card.dataset.desc;
        modal.classList.add('open');
    });
});
document.querySelector('.close-modal').onclick = () => modal.classList.remove('open');
modal.onclick = e => { if (e.target === modal) modal.classList.remove('open'); };

// Contact form success animation
document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const success = document.querySelector('.form-success');
    success.classList.add('active');
    setTimeout(() => { success.classList.remove('active'); e.target.reset(); }, 2000);
});

// Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 500 ? 'block' : 'none';
});
backToTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

// Filtering projects
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        let category = btn.dataset.filter;
        document.querySelectorAll('.project-card').forEach(card => {
            card.style.display = (category === 'all' || card.dataset.category === category) ? 'block' : 'none';
        });
    });
});

// Typed text effect
const typedTextSpan = document.querySelector(".typed-text");
const textArray = JSON.parse(typedTextSpan.getAttribute("data-text"));
let textIndex = 0, charIndex = 0;
function type() {
    if (charIndex < textArray[textIndex].length) {
        typedTextSpan.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 1500);
    }
}
function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(type, 200);
    }
}
document.addEventListener("DOMContentLoaded", type);

// Theme toggle
document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    document.querySelector('#themeToggle i').classList.toggle('fa-sun');
    document.querySelector('#themeToggle i').classList.toggle('fa-moon');
});
