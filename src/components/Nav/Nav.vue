<template>
<!-- w-[70%] -->
<!-- border border-t-0 border-[#999999] dark:border-[#ffffff] rounded-b-[15px] -->
  <nav
    class="fixed top-0 left-1/2 -translate-x-1/2 w-full
      flex items-center px-8 py-4 z-50
      backdrop-blur-md shadow-md"
  >
    <!-- Logo / Brand (optional) -->
    <div class="logo text-xl font-bold select-none cursor-none">Lighthouse Test</div>

    <!-- Links container -->
    <div class="flex flex-1 justify-evenly ml-8">
      <NavLink v-for="link in links" :key="link.id" :link="link" />
    </div>
  </nav>
</template>

<script setup>
import NavLink from "./NavLink.vue";
import { navLinks as links } from "./navLinks.js";
</script>

<style scoped>
/* .logo {
  color: #000000
}

:root.dark .logo {
  color: #ffffff;
} */
@layer utilities {
  @keyframes slideDown {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
    /* from {
      transform: translateY(-20%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    } */
  }

  .animate-slideDown {
    animation: slideDown 0.5s ease-out forwards;
  }
}

.nav-border-shine::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: -30%;
  width: 30%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #99999980, transparent);
  animation: shine 2s infinite linear;
  opacity: 1;
  transition: opacity 0.3s;
}

/* :root.dark .nav-border-shine::before {
  background: linear-gradient(90deg, transparent, #ffffff30, transparent) !important;
} */

@layer utilities {
  @keyframes shine {
    0% {
      left: -30%;
    }
    100% {
      left: 100%;
    }
  }
}


</style>
