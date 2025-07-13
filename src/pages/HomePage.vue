<template>
  <main class="min-h-screen">
    <!-- Hero Section with Animated Background -->
    <section class="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">

      <!-- Hero Content -->
      <div class="relative z-10 max-w-4xl mx-auto">
        <!-- Main Headline -->
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 leading-tight">
          Instant Website
          <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Performance Insights
          </span>
        </h1>

        <!-- Sub-headline -->
        <p class="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-600 leading-relaxed">
          Run Lighthouse audits on-demand, compare key metrics, and export reports — all in one place.
        </p>

        <!-- Primary CTA Button -->
        <router-link
          to="/url-runner"
          class="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <span>Run a Test Now</span>
          <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </router-link>

        <!-- Trust Indicators -->
        <div class="mt-12 flex flex-wrap justify-center items-center gap-8 text-gray-500">
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span>Real-time Results</span>
          </div>
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span>Multiple Device Testing</span>
          </div>
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span>Export Reports</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Video Demo Section -->
    <section class="py-20 px-4 bg-white">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            See It in Action
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Your site's health — visualized in seconds.
          </p>
        </div>

        <!-- Video Container -->
        <div class="relative max-w-4xl mx-auto">
          <div class="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-2xl overflow-hidden">
            <!-- Placeholder for video - replace with actual video -->
            <div class="w-full h-full flex items-center justify-center">
              <div class="text-center">
                <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <p class="text-gray-600 font-medium">Demo Video Coming Soon</p>
                <p class="text-sm text-gray-500 mt-2">15-30 second screen recording showing the full workflow</p>
              </div>
            </div>

            <!-- Video Controls Overlay -->
            <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black bg-opacity-50 rounded-lg p-3 text-white">
              <div class="flex items-center space-x-3">
                <button class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path>
                  </svg>
                </button>
                <span class="text-sm">00:00 / 00:30</span>
              </div>
              <div class="flex items-center space-x-2">
                <button class="w-6 h-6 bg-white bg-opacity-20 rounded flex items-center justify-center hover:bg-opacity-30 transition-colors">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.5 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.5l3.883-2.793a1 1 0 011.617.793zM12.707 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"></path>
                  </svg>
                </button>
                <button class="w-6 h-6 bg-white bg-opacity-20 rounded flex items-center justify-center hover:bg-opacity-30 transition-colors">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Feature Highlights -->
        <div class="mt-16 grid md:grid-cols-3 gap-8">
          <div class="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
            <div class="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2 text-gray-900">Lightning Fast</h3>
            <p class="text-gray-600">Get comprehensive performance reports in under 30 seconds</p>
          </div>

          <div class="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
            <div class="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2 text-gray-900">Detailed Analytics</h3>
            <p class="text-gray-600">Compare metrics across multiple runs and devices</p>
          </div>

          <div class="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
            <div class="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2 text-gray-900">Export Ready</h3>
            <p class="text-gray-600">Download reports in multiple formats for your team</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
// No script needed yet
</script>

<style scoped>
/* Animated Wave Background */
.wave-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.wave {
  position: absolute;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
  border-radius: 50%;
  animation: wave 8s infinite linear;
}

.wave-1 {
  top: -50%;
  left: -50%;
  animation-delay: 0s;
}

.wave-2 {
  top: -50%;
  left: -50%;
  animation-delay: -2s;
  opacity: 0.5;
}

.wave-3 {
  top: -50%;
  left: -50%;
  animation-delay: -4s;
  opacity: 0.3;
}

@keyframes wave {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Lighthouse Beam Animation */
.lighthouse-beam {
  animation: beam 4s ease-in-out infinite;
}

.beam-circle {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes beam {
  0%, 100% {
    transform: translateX(-50%) translateY(-50%) scale(1);
    opacity: 0.1;
  }
  50% {
    transform: translateX(-50%) translateY(-50%) scale(1.2);
    opacity: 0.2;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .wave {
    width: 300%;
    height: 300%;
  }
}
</style>