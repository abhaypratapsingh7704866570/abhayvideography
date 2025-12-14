import './style.css'

// ============================================
// STATE MANAGEMENT
// ============================================
let currentPage = 'home'

// ============================================
// HELPER FUNCTIONS
// ============================================

function createNavButton(id, emoji, label, page) {
  const isActive = currentPage === page
  const activeClass = isActive ? getButtonActiveClass(page) : 'hover:bg-white/5'
  const glowHTML = isActive ? `<div class="nav-button-glow ${page}"></div>` : ''
  
  return `
    <button id="${id}" class="nav-button ${activeClass}">
      <span class="nav-button-content">
        <span class="nav-button-emoji">${emoji}</span>
        <span>${label}</span>
      </span>
      ${glowHTML}
    </button>
  `
}

function getButtonActiveClass(page) {
  const classes = {
    'home': 'bg-gradient-to-r from-rose-600 to-amber-600',
    'frontend': 'bg-gradient-to-r from-purple-600 to-pink-600',
    'backend': 'bg-gradient-to-r from-blue-600 to-cyan-600'
  }
  return classes[page] || ''
}

function createFeatureCard(icon, title, description, tags, gradientFrom, gradientTo, delay) {
  return `
    <div class="feature-card" data-delay="${delay}">
      <div class="feature-card-content">
        <div class="feature-card-gradient ${gradientFrom} ${gradientTo}"></div>
        <div class="feature-card-blob ${gradientFrom}"></div>
        
        <div class="feature-card-inner">
          <div class="feature-icon ${gradientFrom} ${gradientTo}">${icon}</div>
          <h3 class="feature-title">${title}</h3>
          <p class="feature-description">${description}</p>
          <div class="feature-tags">
            ${tags.map(tag => `<span class="feature-tag ${tag.color}">${tag.text}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `
}

function createStatCard(value, label, gradient) {
  return `
    <div class="stat-card">
      <div class="stat-value ${gradient}">${value}</div>
      <div class="stat-label">${label}</div>
    </div>
  `
}

function createQuickContactCard(icon, label, value, href, gradient) {
  return `
    <a href="${href}" class="quick-contact-card ${gradient}">
      <div class="quick-contact-icon">${icon}</div>
      <div class="quick-contact-info">
        <p class="quick-contact-label">${label}</p>
        <p class="quick-contact-value">${value}</p>
      </div>
    </a>
  `
}

// ============================================
// PAGE TEMPLATES
// ============================================

function getHomePageHTML() {
  return `
    <div id="home-section">
      <div class="page-header">
        <div class="availability-badge">
          <span class="availability-pulse"></span>
          <span class="availability-text">Available for Bookings</span>
        </div>
        
        <h1 class="main-title">
          <span class="title-gradient">Capturing Forever</span>
        </h1>
        
        <p class="main-description">
          Professional cinematic videography for your 
          <span class="highlight-rose">dream weddings</span>, 
          and <span class="highlight-amber">unforgettable events</span>
        </p>

        <div class="cta-buttons">
          <button onclick="switchPage('frontend')" class="btn-primary">
            <span class="btn-content">
              View Portfolio
              <span class="btn-arrow">→</span>
            </span>
            <div class="btn-glow"></div>
          </button>
          <button onclick="switchPage('backend')" class="btn-secondary">
            <span class="btn-content-simple">
              Contact Me
              <span>📞</span>
            </span>
          </button>
        </div>
      </div>

      <div class="quick-contact-section">
        <h2 class="quick-contact-title">📞 Get In Touch</h2>
        <div class="quick-contact-grid">
          ${createQuickContactCard(
            '📱',
            'Call / WhatsApp',
            '+91 7704866570',
            'tel:+917704866570',
            'gradient-green'
          )}
          ${createQuickContactCard(
            '📧',
            'Email Us',
            'Contact@abhayvideography.studio',
            'mailto:contact@abhayvideography.studio',
            'gradient-blue'
          )}
          ${createQuickContactCard(
            '💬',
            'WhatsApp Chat',
            'Chat Now',
            'https://wa.me/917704866570',
            'gradient-emerald'
          )}
        </div>
      </div>

      <div class="features-grid">
        ${createFeatureCard(
          '💍',
          'Wedding Cinematography',
          'Your love story deserves to be told beautifully. Cinematic wedding films that capture every precious moment and emotion.',
          [
            { text: 'Cinematic', color: 'tag-rose' },
            { text: '4K Quality', color: 'tag-pink' },
            { text: 'Romantic', color: 'tag-purple' }
          ],
          'from-rose-600',
          'to-pink-600',
          '0.4s'
        )}
        ${createFeatureCard(
          '🎉',
          'Event Coverage',
          'From corporate events to celebrations, we capture every important moment with professional expertise and creativity.',
          [
            { text: 'Professional', color: 'tag-amber' },
            { text: 'Multi-Cam', color: 'tag-yellow' },
            { text: 'Live Edit', color: 'tag-orange' }
          ],
          'from-amber-600',
          'to-yellow-600',
          '0.5s'
        )}
        ${createFeatureCard(
          '🎬',
          'Post-Production Magic',
          'Professional color grading, sound design, and editing to create stunning films that you\'ll treasure forever.',
          [
            { text: 'Color Grade', color: 'tag-purple' },
            { text: 'Audio Mix', color: 'tag-blue' },
            { text: 'Fast Delivery', color: 'tag-indigo' }
          ],
          'from-purple-600',
          'to-blue-600',
          '0.6s'
        )}
      </div>

      <div class="stats-grid">
        ${createStatCard('200+', 'Weddings Shot', 'stat-gradient-rose')}
        ${createStatCard('500+', 'Happy Clients', 'stat-gradient-amber')}
        ${createStatCard('5 Years', 'Experience', 'stat-gradient-purple')}
        ${createStatCard('4K', 'Cinema Quality', 'stat-gradient-green')}
      </div>
    </div>
  `
}

function getPortfolioPageHTML() {
  return `
    <div id="frontend-section">
      <div class="page-header-simple">
        <h1 class="section-title">
          <span class="title-gradient-purple">Our Portfolio</span>
        </h1>
        <p class="section-description">Stunning cinematic moments from real weddings and events</p>
      </div>

      <div class="portfolio-grid">
        <div class="portfolio-card" data-delay="0.1s">
          <div class="portfolio-card-content gradient-rose">
            <div class="portfolio-card-header">
              <div class="portfolio-icon gradient-rose-bg">💍</div>
              <div>
                <h2 class="portfolio-title">Wedding Films</h2>
                <p class="portfolio-subtitle">Love stories that last forever</p>
              </div>
            </div>
            
            <div class="portfolio-video-placeholder gradient-rose-border">
              <div class="video-placeholder-content">
                <div class="video-icon">🎥</div>
                <p class="video-text">Cinematic Wedding Highlight</p>
                <div class="video-tags">
                  <span class="video-tag tag-rose">4K</span>
                  <span class="video-tag tag-pink">Drone</span>
                </div>
              </div>
            </div>

            <p class="portfolio-description">
              From the first look to the last dance, we capture every magical moment of your special day with cinematic excellence.
            </p>
          </div>
        </div>

        <div class="portfolio-card" data-delay="0.2s">
          <div class="portfolio-card-content gradient-amber">
            <div class="portfolio-card-header">
              <div class="portfolio-icon gradient-amber-bg">🎉</div>
              <div>
                <h2 class="portfolio-title">Event Coverage</h2>
                <p class="portfolio-subtitle">Professional event videography</p>
              </div>
            </div>

            <div class="portfolio-video-placeholder gradient-amber-border">
              <div class="video-placeholder-content">
                <div class="video-icon">📹</div>
                <p class="video-text">Corporate & Event Films</p>
                <div class="video-tags">
                  <span class="video-tag tag-amber">Multi-Cam</span>
                  <span class="video-tag tag-yellow">Live</span>
                </div>
              </div>
            </div>

            <p class="portfolio-description">
              Corporate events, birthdays, anniversaries, and celebrations - we document your events with professional multi-camera setups.
            </p>
          </div>
        </div>
      </div>

      <div class="services-banner">
        <div class="services-banner-bg"></div>
        <div class="services-banner-content">
          <div class="services-icon">🎬</div>
          <div class="services-text">
            <p class="services-title">Full-Service Videography</p>
            <p class="services-subtitle">Pre-wedding shoots • Highlights • Full-day coverage • Drone cinematography • Same-day edits</p>
          </div>
          <button onclick="switchPage('backend')" class="services-btn">Book Now</button>
        </div>
      </div>
    </div>
  `
}

function getContactPageHTML() {
  return `
    <div id="backend-section">
      <div class="page-header-simple">
        <h1 class="section-title">
          <span class="title-gradient-blue">Get In Touch</span>
        </h1>
        <p class="section-description">Let's create something beautiful together</p>
      </div>

      <div class="contact-cards-grid">
        <a href="tel:+917704866570" class="contact-card">
          <div class="contact-card-bg gradient-green"></div>
          <div class="contact-card-content">
            <div class="contact-icon">📱</div>
            <h3 class="contact-title">Call Me</h3>
            <p class="contact-value green">+91 7704866570</p>
            <p class="contact-label">Available 24/7</p>
          </div>
        </a>

        <a href="mailto:contact@abhayvideography.studio" class="contact-card" data-delay="0.1s">
          <div class="contact-card-bg gradient-blue"></div>
          <div class="contact-card-content">
            <div class="contact-icon">📧</div>
            <h3 class="contact-title">Email Me</h3>
            <p class="contact-value blue">contact@abhayvideography.studio</p>
            <p class="contact-label">Quick response</p>
          </div>
        </a>

        <a href="https://wa.me/917704866570" target="_blank" class="contact-card" data-delay="0.2s">
          <div class="contact-card-bg gradient-green"></div>
          <div class="contact-card-content">
            <div class="contact-icon">💬</div>
            <h3 class="contact-title">WhatsApp</h3>
            <p class="contact-value emerald">+91 7704866570</p>
            <p class="contact-label">Instant chat</p>
          </div>
        </a>
      </div>

      <div class="contact-main-grid">
        <div class="contact-form-wrapper">
          <div class="contact-form">
            <div class="form-header">
              <div class="form-icon">📝</div>
              <div>
                <h2 class="form-title">Send a Message</h2>
                <p class="form-subtitle">I'll get back to you soon</p>
              </div>
            </div>
            
            <div class="form-fields">
              <input type="text" placeholder="Your Name" class="form-input">
              <input type="email" placeholder="Your Email" class="form-input">
              <input type="tel" placeholder="Your Phone" class="form-input">
              <textarea placeholder="Tell me about your event..." rows="4" class="form-textarea"></textarea>
              
              <button class="form-submit">
                <span class="form-submit-content">
                  Send Message
                  <span class="form-submit-arrow">→</span>
                </span>
                <div class="form-submit-glow"></div>
              </button>
            </div>
          </div>
        </div>

        <div class="contact-info-cards">
          <div class="info-card">
            <div class="info-card-header">
              <div class="info-icon gradient-rose-bg">📍</div>
              <div>
                <h3 class="info-title">Location</h3>
                <p class="info-text">Based in India</p>
                <p class="info-subtext">Available for destination weddings</p>
              </div>
            </div>
          </div>

          <div class="info-card">
            <div class="info-card-header">
              <div class="info-icon gradient-amber-bg">🕐</div>
              <div>
                <h3 class="info-title">Availability</h3>
                <p class="info-text">Mon - Sun: 9:00 AM - 9:00 PM</p>
                <p class="info-subtext">24/7 WhatsApp support</p>
              </div>
            </div>
          </div>

          <div class="info-card">
            <div class="info-card-header">
              <div class="info-icon gradient-blue-bg">📱</div>
              <div class="info-card-social">
                <h3 class="info-title">Follow Me</h3>
                <div class="social-links">
                  <a href="https://www.instagram.com/ABHAY_VIDEOGRAPHY_STUDIO" class="social-link" target="_blank">Instagram</a>
                  
                </div>
              </div>
            </div>
          </div>

          <div class="response-time-card">
            <div class="response-time-content">
              <span class="response-pulse"></span>
              <p class="response-text">Usually responds within 1 hour</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

// ============================================
// APP INITIALIZATION
// ============================================

function initApp() {
  const app = document.getElementById('app')
  
  app.innerHTML = `
    <div class="app-container">
      <div class="blob blob-purple"></div>
      <div class="blob blob-blue"></div>
      <div class="blob blob-pink"></div>

      <nav class="navbar">
        <div class="navbar-container">
          <div class="navbar-content">
            <div class="navbar-brand">
              <div class="brand-icon">🎬</div>
              <div>
                <h1 class="brand-title">Abhay Videography</h1>
                <p class="brand-subtitle">Cinematic Wedding & Event Films</p>
              </div>
            </div>
            <div class="navbar-buttons">
              ${createNavButton('home-btn', '🏠', 'Home', 'home')}
              ${createNavButton('frontend-btn', '💍', 'Portfolio', 'frontend')}
              ${createNavButton('backend-btn', '📞', 'Contact US', 'backend')}
            </div>
          </div>
        </div>
      </nav>

      <div id="content" class="main-content"></div>

      <footer class="footer">
        <p>© 2024 Abhay Videography. All rights reserved.</p>
        <p>Professional Wedding Cinematic Videographer & Event Videographer</p>
        <p class="footer-tagline">Capturing memories that last forever 🎬</p>
      </footer>
    </div>
  `

  showPage(currentPage)
  
  document.getElementById('home-btn').addEventListener('click', () => switchPage('home'))
  document.getElementById('frontend-btn').addEventListener('click', () => switchPage('frontend'))
  document.getElementById('backend-btn').addEventListener('click', () => switchPage('backend'))
}

// ============================================
// PAGE SWITCHING & NAVIGATION
// ============================================

function switchPage(page) {
  currentPage = page
  updateNavButtons()
  showPage(page)
}

function updateNavButtons() {
  const buttons = {
    'home': document.getElementById('home-btn'),
    'frontend': document.getElementById('frontend-btn'),
    'backend': document.getElementById('backend-btn')
  }
  
  Object.entries(buttons).forEach(([key, btn]) => {
    const isActive = key === currentPage
    
    btn.className = 'nav-button hover:bg-white/5'
    
    if (isActive) {
      btn.className = `nav-button ${getButtonActiveClass(key)}`
      
      const existingGlow = btn.querySelector('.nav-button-glow')
      if (existingGlow) existingGlow.remove()
      
      const glow = document.createElement('div')
      glow.className = `nav-button-glow ${key}`
      btn.appendChild(glow)
    } else {
      const existingGlow = btn.querySelector('.nav-button-glow')
      if (existingGlow) existingGlow.remove()
    }
  })
}

function showPage(page) {
  const content = document.getElementById('content')
  
  switch(page) {
    case 'home':
      content.innerHTML = getHomePageHTML()
      break
    case 'frontend':
      content.innerHTML = getPortfolioPageHTML()
      break
    case 'backend':
      content.innerHTML = getContactPageHTML()
      break
  }
  
  applyAnimations()
}

function applyAnimations() {
  const elements = document.querySelectorAll('[data-delay]')
  elements.forEach(el => {
    const delay = el.getAttribute('data-delay')
    el.style.animationDelay = delay
    el.classList.add('animate-slide-in')
  })
}

// ============================================
// GLOBAL EXPORTS & INITIALIZATION
// ============================================

window.switchPage = switchPage

document.addEventListener('DOMContentLoaded', initApp)
