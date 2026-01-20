// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
    
    // Carregar notícias
    loadNews();
});

// Função para carregar notícias do content.json
async function loadNews() {
    const newsContainer = document.getElementById('news-container');
    
    try {
        const response = await fetch('content.json');
        const data = await response.json();
        
        if (data.noticias && data.noticias.length > 0) {
            // Ordenar por data (mais recente primeiro)
            const sortedNews = data.noticias.sort((a, b) => {
                return new Date(b.data) - new Date(a.data);
            });
            
            // Limpar container
            newsContainer.innerHTML = '';
            
            // Criar cards de notícias
            sortedNews.forEach(noticia => {
                const newsCard = createNewsCard(noticia);
                newsContainer.appendChild(newsCard);
            });
        } else {
            newsContainer.innerHTML = '<div class="no-news"><p>Nenhuma notícia publicada ainda.</p></div>';
        }
    } catch (error) {
        console.error('Erro ao carregar notícias:', error);
        newsContainer.innerHTML = '<div class="no-news"><p>Erro ao carregar notícias. Tente novamente mais tarde.</p></div>';
    }
}

// Função para criar card de notícia
function createNewsCard(noticia) {
    const card = document.createElement('div');
    card.className = 'news-card' + (noticia.destaque ? ' featured' : '');
    
    // Formatar data
    const dataFormatada = new Date(noticia.data + 'T00:00:00').toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
    
    card.innerHTML = `
        ${noticia.destaque ? '<div class="news-badge">DESTAQUE</div>' : ''}
        <div class="news-content">
            <div class="news-date">${dataFormatada}</div>
            <h3 class="news-title">${noticia.titulo}</h3>
            <p class="news-description">${noticia.descricao}</p>
            ${noticia.autor ? `<div class="news-author">${noticia.autor}</div>` : ''}
        </div>
    `;
    
    return card;
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Prayer Form Handler
const prayerForm = document.getElementById('prayer-form');
if (prayerForm) {
    prayerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const pedido = document.getElementById('pedido').value;
        
        // Criar mensagem para WhatsApp
        const mensagem = `*Pedido de Oração*\n\n*Nome:* ${nome}\n\n*Pedido:* ${pedido}`;
        const whatsappUrl = `https://wa.me/5566981365456?text=${encodeURIComponent(mensagem)}`;
        
        // Abrir WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Limpar formulário
        prayerForm.reset();
        
        // Mostrar mensagem de confirmação
        alert('Você será redirecionado para o WhatsApp para enviar seu pedido de oração! 🙏');
    });
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.15)';
    } else if (currentScroll > lastScroll) {
        // Scroll down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scroll up
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    }
    
    lastScroll = currentScroll;
});

// Adicionar transição ao navbar
navbar.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

// Animação de elementos ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação a elementos
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.section-title, .about-text, .schedule-card, .contact-item, .timeline li');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Adicionar efeito de digitação no hero
const heroTitle = document.querySelector('.hero h2');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Iniciar animação após 500ms
    setTimeout(typeWriter, 500);
}

// Easter egg - Fogo do Espírito Santo
let clickCount = 0;
const emblemFlame = document.querySelector('.emblem-flame');

if (emblemFlame) {
    emblemFlame.addEventListener('click', function() {
        clickCount++;
        
        if (clickCount === 7) {
            this.style.animation = 'flame 1s infinite';
            
            // Adicionar animação CSS
            if (!document.querySelector('#flame-animation')) {
                const style = document.createElement('style');
                style.id = 'flame-animation';
                style.textContent = `
                    @keyframes flame {
                        0%, 100% { transform: scale(1) rotate(0deg); }
                        25% { transform: scale(1.2) rotate(5deg); }
                        75% { transform: scale(1.2) rotate(-5deg); }
                    }
                `;
                document.head.appendChild(style);
            }
            
            setTimeout(() => {
                this.style.animation = '';
                clickCount = 0;
            }, 5000);
        }
    });
}

// Console message
console.log('%c🔥 Grupo de Oração Rainha da Paz 🔥', 'font-size: 20px; font-weight: bold; color: #C8102E;');
console.log('%cRenovação Carismática Católica', 'font-size: 14px; color: #FFD100;');
console.log('%cVem e Vê! Quartas-feiras às 19:30', 'font-size: 12px; color: #666;');
