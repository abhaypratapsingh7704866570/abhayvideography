import './style.css'

let currentPage = 'home'

function initApp() {
  const app = document.getElementById('app')
  
  app.innerHTML = `
    <div class="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900 text-white overflow-hidden">
      <!-- Animated Background Blobs -->
      <div class="blob w-96 h-96 bg-purple-600 top-0 left-0 animate-float"></div>
      <div class="blob w-96 h-96 bg-blue-600 bottom-0 right-0 animate-float" style="animation-delay: 2s"></div>
      <div class="blob w-96 h-96 bg-pink-600 top-1/2 left-1/2 animate-float" style="animation-delay: 4s"></div>

      <!-- Navbar -->
      <nav class="relative z-50 glass-effect border-b border-white/10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3 animate-slide-in">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-2xl animate-gradient shrink-0">
                🎬
              </div>
              <div>
                <h1 class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-rose-400 via-amber-400 to-rose-400 bg-clip-text text-transparent animate-gradient">
                  Abhay Videography
                </h1>
                <p class="text-xs text-gray-400 hidden sm:block">Cinematic Wedding & Event Films</p>
              </div>
            </div>
            <div class="flex flex-wrap gap-2 justify-center animate-slide-in" style="animation-delay: 0.2s">
              <button id="home-btn" class="group relative px-4 sm:px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 overflow-hidden text-sm sm:text-base ${currentPage === 'home' ? 'bg-gradient-to-r from-rose-600 to-amber-600' : 'hover:bg-white/5'}">
                <span class="relative z-10 flex items-center gap-2">
                  <span class="text-lg sm:text-xl">🏠</span>
                  <span>Home</span>
                </span>
                ${currentPage === 'home' ? '<div class="absolute inset-0 bg-gradient-to-r from-rose-600 to-amber-600 opacity-50 blur-xl"></div>' : ''}
              </button>
              <button id="frontend-btn" class="group relative px-4 sm:px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 overflow-hidden text-sm sm:text-base ${currentPage === 'frontend' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'hover:bg-white/5'}">
                <span class="relative z-10 flex items-center gap-2">
                  <span class="text-lg sm:text-xl">💍</span>
                  <span>Portfolio</span>
                </span>
                ${currentPage === 'frontend' ? '<div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-50 blur-xl"></div>' : ''}
              </button>
              <button id="backend-btn" class="group relative px-4 sm:px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 overflow-hidden text-sm sm:text-base ${currentPage === 'backend' ? 'bg-gradient-to-r from-blue-600 to-cyan-600' : 'hover:bg-white/5'}">
                <span class="relative z-10 flex items-center gap-2">
                  <span class="text-lg sm:text-xl">📞</span>
                  <span>Contact</span>
                </span>
                ${currentPage === 'backend' ? '<div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-50 blur-xl"></div>' : ''}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Content -->
      <div id="content" class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        
        <!-- Home Section -->
        <div id="home-section" class="hidden">
          <div class="text-center mb-12 sm:mb-16 lg:mb-20 space-y-4 sm:space-y-6">
            <div class="inline-block animate-slide-in">
              <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect text-xs sm:text-sm mb-4 sm:mb-6">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
                <span class="text-gray-300">Available for Bookings</span>
              </div>
            </div>
            
            <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 animate-slide-in px-4" style="animation-delay: 0.1s">
              <span class="bg-gradient-to-r from-rose-400 via-amber-400 to-rose-400 bg-clip-text text-transparent animate-gradient text-glow">
                Capturing Forever
              </span>
            </h1>
            
            <p class="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slide-in px-4" style="animation-delay: 0.2s">
              Professional cinematic videography for your 
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">dream weddings</span>, 
              and <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400">unforgettable events</span>
            </p>

            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-slide-in px-4" style="animation-delay: 0.3s">
              <button onclick="switchPage('frontend')" class="w-full sm:w-auto group relative px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 overflow-hidden bg-gradient-to-r from-rose-600 to-amber-600 hover:scale-105">
                <span class="relative z-10 flex items-center justify-center gap-2">
                  View Portfolio
                  <span class="group-hover:translate-x-1 transition-transform">→</span>
                </span>
                <div class="absolute inset-0 bg-gradient-to-r from-rose-600 to-amber-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
              </button>
              <button onclick="switchPage('backend')" class="w-full sm:w-auto group relative px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 glass-effect hover:bg-white/10">
                <span class="flex items-center justify-center gap-2">
                  Contact Me
                  <span class="text-xl">📞</span>
                </span>
              </button>
            </div>
          </div>

          <!-- Feature Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div class="group card-hover animate-slide-in" style="animation-delay: 0.4s">
              <div class="relative h-full p-8 rounded-3xl glass-effect overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-rose-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div class="absolute top-0 right-0 w-32 h-32 bg-rose-600/30 rounded-full blur-3xl"></div>
                
                <div class="relative z-10 space-y-4">
                  <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-600 to-pink-600 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                    💍
                  </div>
                  <h3 class="text-2xl font-bold">Wedding Cinematography</h3>
                  <p class="text-gray-400 leading-relaxed">
                    Your love story deserves to be told beautifully. Cinematic wedding films that capture every precious moment and emotion.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 rounded-full text-xs bg-rose-600/20 text-rose-400 border border-rose-500/30">Cinematic</span>
                    <span class="px-3 py-1 rounded-full text-xs bg-pink-600/20 text-pink-400 border border-pink-500/30">4K Quality</span>
                    <span class="px-3 py-1 rounded-full text-xs bg-purple-600/20 text-purple-400 border border-purple-500/30">Romantic</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="group card-hover animate-slide-in" style="animation-delay: 0.5s">
              <div class="relative h-full p-8 rounded-3xl glass-effect overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-yellow-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div class="absolute top-0 right-0 w-32 h-32 bg-amber-600/30 rounded-full blur-3xl"></div>
                
                <div class="relative z-10 space-y-4">
                  <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-600 to-yellow-600 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                    🎉
                  </div>
                  <h3 class="text-2xl font-bold">Event Coverage</h3>
                  <p class="text-gray-400 leading-relaxed">
                    From corporate events to celebrations, we capture every important moment with professional expertise and creativity.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 rounded-full text-xs bg-amber-600/20 text-amber-400 border border-amber-500/30">Professional</span>
                    <span class="px-3 py-1 rounded-full text-xs bg-yellow-600/20 text-yellow-400 border border-yellow-500/30">Multi-Cam</span>
                    <span class="px-3 py-1 rounded-full text-xs bg-orange-600/20 text-orange-400 border border-orange-500/30">Live Edit</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="group card-hover animate-slide-in" style="animation-delay: 0.6s">
              <div class="relative h-full p-8 rounded-3xl glass-effect overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div class="absolute top-0 right-0 w-32 h-32 bg-purple-600/30 rounded-full blur-3xl"></div>
                
                <div class="relative z-10 space-y-4">
                  <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                    🎬
                  </div>
                  <h3 class="text-2xl font-bold">Post-Production Magic</h3>
                  <p class="text-gray-400 leading-relaxed">
                    Professional color grading, sound design, and editing to create stunning films that you'll treasure forever.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 rounded-full text-xs bg-purple-600/20 text-purple-400 border border-purple-500/30">Color Grade</span>
                    <span class="px-3 py-1 rounded-full text-xs bg-blue-600/20 text-blue-400 border border-blue-500/30">Audio Mix</span>
                    <span class="px-3 py-1 rounded-full text-xs bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">Fast Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Stats Section -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 animate-slide-in" style="animation-delay: 0.7s">
            <div class="p-4 sm:p-6 rounded-2xl glass-effect text-center">
              <div class="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent mb-1 sm:mb-2">200+</div>
              <div class="text-gray-400 text-xs sm:text-sm">Weddings Shot</div>
            </div>
            <div class="p-4 sm:p-6 rounded-2xl glass-effect text-center">
              <div class="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent mb-1 sm:mb-2">500+</div>
              <div class="text-gray-400 text-xs sm:text-sm">Happy Clients</div>
            </div>
            <div class="p-4 sm:p-6 rounded-2xl glass-effect text-center">
              <div class="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-1 sm:mb-2">5 Years</div>
              <div class="text-gray-400 text-xs sm:text-sm">Experience</div>
            </div>
            <div class="p-4 sm:p-6 rounded-2xl glass-effect text-center">
              <div class="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-1 sm:mb-2">4K</div>
              <div class="text-gray-400 text-xs sm:text-sm">Cinema Quality</div>
            </div>
          </div>
        </div>

        <!-- Frontend Section -->
        <div id="frontend-section" class="hidden space-y-6 sm:space-y-8">
          <div class="text-center mb-8 sm:mb-12 animate-slide-in">
            <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 px-4">
              <span class="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient text-glow">
                Our Portfolio
              </span>
            </h1>
            <p class="text-base sm:text-lg md:text-xl text-gray-400 px-4">Stunning cinematic moments from real weddings and events</p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Wedding Highlight -->
            <div class="group animate-slide-in" style="animation-delay: 0.1s">
              <div class="relative p-8 rounded-3xl glass-effect card-hover overflow-hidden h-full">
                <div class="absolute inset-0 bg-gradient-to-br from-rose-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div class="shimmer absolute inset-0"></div>
                
                <div class="relative z-10 space-y-6">
                  <div class="flex items-center gap-3 mb-6">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-600 to-pink-600 flex items-center justify-center text-2xl">
                      💍
                    </div>
                    <div>
                      <h2 class="text-2xl font-bold">Wedding Films</h2>
                      <p class="text-sm text-gray-400">Love stories that last forever</p>
                    </div>
                  </div>
                  
                  <div class="aspect-video rounded-2xl bg-gradient-to-br from-rose-900/30 to-pink-900/30 border border-rose-500/30 flex items-center justify-center overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                    <div class="text-center space-y-3">
                      <div class="text-6xl">🎥</div>
                      <p class="text-gray-400 text-sm">Cinematic Wedding Highlight</p>
                      <div class="flex gap-2 justify-center">
                        <span class="px-3 py-1 rounded-full text-xs bg-rose-600/20 text-rose-400 border border-rose-500/30">4K</span>
                        <span class="px-3 py-1 rounded-full text-xs bg-pink-600/20 text-pink-400 border border-pink-500/30">Drone</span>
                      </div>
                    </div>
                  </div>

                  <p class="text-gray-400 leading-relaxed">
                    From the first look to the last dance, we capture every magical moment of your special day with cinematic excellence.
                  </p>
                </div>
              </div>
            </div>

            <!-- Event Coverage -->
            <div class="group animate-slide-in" style="animation-delay: 0.2s">
              <div class="relative p-8 rounded-3xl glass-effect card-hover overflow-hidden h-full">
                <div class="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-yellow-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div class="relative z-10 space-y-6">
                  <div class="flex items-center gap-3 mb-6">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 to-yellow-600 flex items-center justify-center text-2xl">
                      🎉
                    </div>
                    <div>
                      <h2 class="text-2xl font-bold">Event Coverage</h2>
                      <p class="text-sm text-gray-400">Professional event videography</p>
                    </div>
                  </div>

                  <div class="aspect-video rounded-2xl bg-gradient-to-br from-amber-900/30 to-yellow-900/30 border border-amber-500/30 flex items-center justify-center overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                    <div class="text-center space-y-3">
                      <div class="text-6xl">📹</div>
                      <p class="text-gray-400 text-sm">Corporate & Event Films</p>
                      <div class="flex gap-2 justify-center">
                        <span class="px-3 py-1 rounded-full text-xs bg-amber-600/20 text-amber-400 border border-amber-500/30">Multi-Cam</span>
                        <span class="px-3 py-1 rounded-full text-xs bg-yellow-600/20 text-yellow-400 border border-yellow-500/30">Live</span>
                      </div>
                    </div>
                  </div>

                  <p class="text-gray-400 leading-relaxed">
                    Corporate events, birthdays, anniversaries, and celebrations - we document your events with professional multi-camera setups.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Services Banner -->
          <div class="relative p-6 rounded-2xl glass-effect overflow-hidden animate-slide-in" style="animation-delay: 0.3s">
            <div class="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
            <div class="relative z-10 flex flex-col sm:flex-row items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-2xl shrink-0">
                🎬
              </div>
              <div class="flex-1 text-center sm:text-left">
                <p class="font-bold text-purple-400 text-lg">Full-Service Videography</p>
                <p class="text-gray-400 text-sm">Pre-wedding shoots • Highlights • Full-day coverage • Drone cinematography • Same-day edits</p>
              </div>
              <button onclick="switchPage('backend')" class="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold hover:scale-105 transition-transform shrink-0">
                Book Now
              </button>
            </div>
          </div>
        </div>

        <!-- Backend Section -->
        <div id="backend-section" class="hidden space-y-6 sm:space-y-8">
          <div class="text-center mb-8 sm:mb-12 animate-slide-in">
            <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 px-4">
              <span class="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-gradient text-glow">
                Get In Touch
              </span>
            </h1>
            <p class="text-base sm:text-lg md:text-xl text-gray-400 px-4">Let's create something beautiful together</p>
          </div>

          <!-- Contact Info Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <a 
              href="tel:+919876543210" 
              class="group relative p-6 sm:p-8 rounded-3xl glass-effect hover:scale-[1.02] transition-all duration-300 overflow-hidden animate-slide-in"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div class="relative z-10 text-center space-y-2 sm:space-y-3">
                <div class="text-3xl sm:text-4xl mb-1 sm:mb-2">📱</div>
                <h3 class="text-xl sm:text-2xl font-bold">Call Me</h3>
                <p class="text-green-400 text-sm sm:text-base font-semibold">+91 98765 43210</p>
                <p class="text-gray-400 text-xs sm:text-sm">Available 24/7</p>
              </div>
            </a>

            <a 
              href="mailto:abhay.videography@gmail.com" 
              class="group relative p-6 sm:p-8 rounded-3xl glass-effect hover:scale-[1.02] transition-all duration-300 overflow-hidden animate-slide-in" 
              style="animation-delay: 0.1s"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div class="relative z-10 text-center space-y-2 sm:space-y-3">
                <div class="text-3xl sm:text-4xl mb-1 sm:mb-2">📧</div>
                <h3 class="text-xl sm:text-2xl font-bold">Email Me</h3>
                <p class="text-blue-400 text-xs sm:text-sm font-semibold break-all">abhay.videography@gmail.com</p>
                <p class="text-gray-400 text-xs sm:text-sm">Quick response</p>
              </div>
            </a>

            <a 
              href="https://wa.me/919876543210" 
              target="_blank"
              class="group relative p-6 sm:p-8 rounded-3xl glass-effect hover:scale-[1.02] transition-all duration-300 overflow-hidden animate-slide-in" 
              style="animation-delay: 0.2s"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div class="relative z-10 text-center space-y-2 sm:space-y-3">
                <div class="text-3xl sm:text-4xl mb-1 sm:mb-2">💬</div>
                <h3 class="text-xl sm:text-2xl font-bold">WhatsApp</h3>
                <p class="text-emerald-400 text-sm sm:text-base font-semibold">+91 98765 43210</p>
                <p class="text-gray-400 text-xs sm:text-sm">Instant chat</p>
              </div>
            </a>
          </div>

          <!-- Contact Form & Info -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-in" style="animation-delay: 0.3s">
            <!-- Contact Form -->
            <div class="group">
              <div class="relative p-8 rounded-3xl glass-effect overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div class="relative z-10 space-y-6">
                  <div class="flex items-center gap-3 mb-6">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-2xl">
                      📝
                    </div>
                    <div>
                      <h2 class="text-2xl font-bold">Send a Message</h2>
                      <p class="text-sm text-gray-400">I'll get back to you soon</p>
                    </div>
                  </div>
                  
                  <div class="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      class="w-full px-6 py-4 bg-black/30 border border-purple-500/30 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300"
                    >
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      class="w-full px-6 py-4 bg-black/30 border border-purple-500/30 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300"
                    >
                    <input 
                      type="tel" 
                      placeholder="Your Phone" 
                      class="w-full px-6 py-4 bg-black/30 border border-purple-500/30 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300"
                    >
                    <textarea 
                      placeholder="Tell me about your event..." 
                      rows="4"
                      class="w-full px-6 py-4 bg-black/30 border border-purple-500/30 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                    ></textarea>
                    
                    <button class="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group">
                      <span class="relative z-10 flex items-center justify-center gap-2">
                        Send Message
                        <span class="group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                      <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Business Info -->
            <div class="space-y-6">
              <!-- Location -->
              <div class="group p-6 rounded-3xl glass-effect hover:scale-[1.02] transition-all duration-300">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-600 to-pink-600 flex items-center justify-center text-2xl shrink-0">
                    📍
                  </div>
                  <div>
                    <h3 class="text-xl font-bold mb-2">Location</h3>
                    <p class="text-gray-400">Based in India</p>
                    <p class="text-gray-400 text-sm">Available for destination weddings</p>
                  </div>
                </div>
              </div>

              <!-- Working Hours -->
              <div class="group p-6 rounded-3xl glass-effect hover:scale-[1.02] transition-all duration-300">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 to-yellow-600 flex items-center justify-center text-2xl shrink-0">
                    🕐
                  </div>
                  <div>
                    <h3 class="text-xl font-bold mb-2">Availability</h3>
                    <p class="text-gray-400">Mon - Sun: 9:00 AM - 9:00 PM</p>
                    <p class="text-gray-400 text-sm">24/7 WhatsApp support</p>
                  </div>
                </div>
              </div>

              <!-- Social Media -->
              <div class="group p-6 rounded-3xl glass-effect hover:scale-[1.02] transition-all duration-300">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-2xl shrink-0">
                    📱
                  </div>
                  <div class="flex-1">
                    <h3 class="text-xl font-bold mb-3">Follow Me</h3>
                    <div class="flex flex-wrap gap-3">
                      <a href="#" class="px-4 py-2 rounded-xl glass-effect hover:bg-white/10 transition-colors text-sm">Instagram</a>
                      <a href="#" class="px-4 py-2 rounded-xl glass-effect hover:bg-white/10 transition-colors text-sm">Facebook</a>
                      <a href="#" class="px-4 py-2 rounded-xl glass-effect hover:bg-white/10 transition-colors text-sm">YouTube</a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Response Time -->
              <div class="p-6 rounded-2xl glass-effect bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/30">
                <div class="flex items-center gap-3">
                  <span class="relative flex h-3 w-3">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <p class="text-green-400 font-semibold">Usually responds within 1 hour</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="relative z-10 text-center py-8 text-gray-500 text-sm space-y-2">
        <p>© 2024 Abhay Videography. All rights reserved.</p>
        <p>Professional Wedding Cinematic Videographer & Event Videographer</p>
        <p class="text-xs">Capturing memories that last forever 🎬</p>
      </div>
    </div>
  `

  showPage(currentPage)
  
  document.getElementById('home-btn').addEventListener('click', () => switchPage('home'))
  document.getElementById('frontend-btn').addEventListener('click', () => switchPage('frontend'))
  document.getElementById('backend-btn').addEventListener('click', () => switchPage('backend'))
}

function switchPage(page) {
  currentPage = page
  
  const buttons = {
    'home': document.getElementById('home-btn'),
    'frontend': document.getElementById('frontend-btn'),
    'backend': document.getElementById('backend-btn')
  }
  
  Object.entries(buttons).forEach(([key, btn]) => {
    if (key === page) {
      btn.className = btn.className.replace(/hover:bg-white\/5/g, '')
      if (key === 'home') {
        btn.className = btn.className.replace(/bg-white\/5/, 'bg-gradient-to-r from-rose-600 to-amber-600')
        btn.innerHTML = btn.innerHTML.replace(/<div class="absolute[^>]*><\/div>/g, '') + 
          '<div class="absolute inset-0 bg-gradient-to-r from-rose-600 to-amber-600 opacity-50 blur-xl"></div>'
      } else if (key === 'frontend') {
        btn.className = btn.className.replace(/bg-white\/5/, 'bg-gradient-to-r from-purple-600 to-pink-600')
        btn.innerHTML = btn.innerHTML.replace(/<div class="absolute[^>]*><\/div>/g, '') + 
          '<div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-50 blur-xl"></div>'
      } else if (key === 'backend') {
        btn.className = btn.className.replace(/bg-white\/5/, 'bg-gradient-to-r from-blue-600 to-cyan-600')
        btn.innerHTML = btn.innerHTML.replace(/<div class="absolute[^>]*><\/div>/g, '') + 
          '<div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-50 blur-xl"></div>'
      }
    } else {
      btn.className = btn.className.replace(/bg-gradient-to-r.*?(from|to)-\w+-\d+/g, '').trim()
      btn.className += ' hover:bg-white/5'
      btn.innerHTML = btn.innerHTML.replace(/<div class="absolute[^>]*><\/div>/g, '')
    }
  })
  
  showPage(page)
}

function showPage(page) {
  document.getElementById('home-section').classList.toggle('hidden', page !== 'home')
  document.getElementById('frontend-section').classList.toggle('hidden', page !== 'frontend')
  document.getElementById('backend-section').classList.toggle('hidden', page !== 'backend')
}

// Make switchPage function available globally
window.switchPage = switchPage

document.addEventListener('DOMContentLoaded', initApp)
