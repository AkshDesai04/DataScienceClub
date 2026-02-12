/**
 * and minimal tech grid/network animation for Data Science Club Hero Section
 * Renders floating nodes connected by lines on a canvas.
 */

const canvas = document.getElementById('tech-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

// Configuration
const PARTICLE_COUNT = 80;
const CONNECTION_DISTANCE = 150;
const MOUSE_DISTANCE = 200;

// Resize handling
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

// Particle Class
class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.color = `rgba(249, 115, 22, ${Math.random() * 0.5 + 0.1})`; // Orange tint
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Initialize particles
function initParticles() {
    particles = [];
    resize();
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }
}

// Animation Loop
function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    particles.forEach((p, index) => {
        p.update();
        p.draw();

        // Connect particles
        for (let j = index + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < CONNECTION_DISTANCE) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / CONNECTION_DISTANCE * 0.15})`; // Subtle white lines
                ctx.lineWidth = 0.5;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    });

    requestAnimationFrame(animate);
}

// Event Listeners
window.addEventListener('resize', () => {
    resize();
    initParticles();
});

// Start
initParticles();
animate();
