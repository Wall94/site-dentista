// Esperar que o DOM seja completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do menu mobile
    const menuMobile = document.querySelector('.menu-mobile');
    const navMobile = document.querySelector('.nav-mobile');
    const overlay = document.querySelector('.overlay');
    const body = document.body;
    
    // Toggle do menu mobile
    menuMobile.addEventListener('click', function() {
        navMobile.classList.toggle('active');
        overlay.classList.toggle('active');
        menuMobile.querySelector('i').classList.toggle('fa-bars');
        menuMobile.querySelector('i').classList.toggle('fa-times');
        body.classList.toggle('no-scroll');
    });
    
    // Fechar menu ao clicar no overlay
    overlay.addEventListener('click', function() {
        navMobile.classList.remove('active');
        overlay.classList.remove('active');
        menuMobile.querySelector('i').classList.add('fa-bars');
        menuMobile.querySelector('i').classList.remove('fa-times');
        body.classList.remove('no-scroll');
    });
    
    // Fechar menu ao clicar em um link
    const mobileLinks = document.querySelectorAll('.nav-mobile a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMobile.classList.remove('active');
            overlay.classList.remove('active');
            menuMobile.querySelector('i').classList.add('fa-bars');
            menuMobile.querySelector('i').classList.remove('fa-times');
            body.classList.remove('no-scroll');
        });
    });
    
    // Adicionar classe ao header quando rolar a página
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Animação de elementos ao scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // Verificar elementos visíveis ao carregar a página
    checkFade();
    
    // Verificar elementos visíveis ao rolar a página
    window.addEventListener('scroll', checkFade);
    
    // Depoimentos Slider (versão simples)
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.style.display = 'block';
            } else {
                testimonial.style.display = 'none';
            }
        });
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    // Mudar depoimento a cada 5 segundos se houver mais de um
    if (testimonials.length > 1) {
        showTestimonial(0);
        setInterval(nextTestimonial, 5000);
    }
    
    // Ajustar altura dos cards de serviço para ficarem uniformes
    function equalizeCardHeights() {
        const cards = document.querySelectorAll('.service-card');
        let maxHeight = 0;
        
        // Resetar alturas
        cards.forEach(card => {
            card.style.height = 'auto';
        });
        
        // Encontrar altura máxima
        cards.forEach(card => {
            if (card.offsetHeight > maxHeight) {
                maxHeight = card.offsetHeight;
            }
        });
        
        // Aplicar altura máxima a todos os cards
        if (window.innerWidth > 768) {
            cards.forEach(card => {
                card.style.height = maxHeight + 'px';
            });
        }
    }
    
    // Executar ao carregar e redimensionar
    equalizeCardHeights();
    window.addEventListener('resize', equalizeCardHeights);
});

// Adicionar classe para animações quando a página estiver totalmente carregada
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Adicionar classe active aos elementos fade-in que estão visíveis inicialmente
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
});

// Validação de formulários
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    const appointmentForm = document.getElementById('appointmentForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateContactForm();
        });
    }
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateAppointmentForm();
        });
    }
}

function validateContactForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !message) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return false;
    }
    
    if (!isValidEmail(email)) {
        alert('Por favor, insira um e-mail válido.');
        return false;
    }
    
    // Simular envio (substituir por integração real)
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    document.getElementById('contactForm').reset();
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Inicializar validação
initFormValidation();

// Funcionalidade de busca
function initSearch() {
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = this.querySelector('input').value;
            if (query.trim()) {
                // Simular busca (implementar busca real depois)
                alert(`Buscando por: "${query}". Funcionalidade em desenvolvimento.`);
            }
        });
    }
}

// Inicializar busca
initSearch();

// Google Maps Integration
function initGoogleMaps() {
    // Verificar se estamos na página de contato
    if (window.location.pathname.includes('contato.html')) {
        // Adicionar loading state
        const mapContainer = document.querySelector('.google-map');
        if (mapContainer) {
            const iframe = mapContainer.querySelector('iframe');
            
            // Loading indicator
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'map-loading';
            loadingDiv.innerHTML = `
                <div class="loading-spinner"></div>
                <p>Carregando mapa...</p>
            `;
            mapContainer.appendChild(loadingDiv);
            
            // Remove loading when iframe loads
            iframe.addEventListener('load', function() {
                setTimeout(() => {
                    loadingDiv.remove();
                }, 1000);
            });
        }
        
        // Adicionar funcionalidade de fullscreen
        addMapFullscreen();
    }
}

// Funcionalidade de tela cheia para o mapa
function addMapFullscreen() {
    const mapContainer = document.querySelector('.google-map');
    if (mapContainer) {
        const fullscreenBtn = document.createElement('button');
        fullscreenBtn.className = 'map-fullscreen-btn';
        fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        fullscreenBtn.title = 'Ver em tela cheia';
        
        fullscreenBtn.addEventListener('click', function() {
            const iframe = mapContainer.querySelector('iframe');
            const mapUrl = iframe.src.replace('embed?', 'embed?output=embed&');
            window.open(mapUrl, '_blank');
        });
        
        mapContainer.appendChild(fullscreenBtn);
    }
}

// Inicializar Google Maps
initGoogleMaps();

// ⚡ **5. Otimizações de Performance**

// **Implementar lazy loading:**

// Lazy Loading para imagens
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback para navegadores antigos
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Inicializar lazy loading
initLazyLoading();