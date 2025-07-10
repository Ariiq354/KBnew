<script lang="ts" setup>
  const authStore = useAuthStore();
  const open = ref(false);
</script>

<template>
  <header
    class="sticky top-0 z-30 w-full border-b-2 border-gray-200 bg-white py-4 font-sans"
  >
    <div class="container flex items-center justify-between">
      <div
        class="flex items-center gap-4 font-bold tracking-wider text-black md:text-2xl"
      >
        <NuxtImg src="/logo.webp" alt="logo" class="h-10 md:h-14" />
        <p class="text-eastern-blue-700">KELUARGA BAHAGIA</p>
      </div>
      <nav class="hidden gap-12 text-lg font-semibold md:flex">
        <NuxtLink
          href="/"
          class="transition-all duration-300 hover:-translate-y-1 hover:opacity-70"
        >
          Beranda
        </NuxtLink>
        <NuxtLink
          href="/about"
          class="transition-all duration-300 hover:-translate-y-1 hover:opacity-70"
        >
          Tentang Kami
        </NuxtLink>
        <NuxtLink
          href="/product"
          class="transition-all duration-300 hover:-translate-y-1 hover:opacity-70"
        >
          Layanan
        </NuxtLink>
        <NuxtLink
          href="/contact"
          class="transition-all duration-300 hover:-translate-y-1 hover:opacity-70"
        >
          Kontak
        </NuxtLink>
      </nav>
      <UButton
        v-if="!authStore.user"
        to="/login"
        class="hidden text-white md:block"
      >
        Daftar
      </UButton>
      <UButton
        v-else
        :to="
          authStore.user?.role === 'admin' ? '/dashboard' : '/dashboard/profil'
        "
        class="hidden text-white md:block"
      >
        Dashboard
      </UButton>
      <USlideover v-model:open="open" class="md:hidden" title="Menu">
        <div role="button" aria-label="Open Menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 12h16M4 6h16M4 18h16"
            />
          </svg>
        </div>

        <template #body>
          <nav class="flex flex-col gap-4">
            <NuxtLink
              href="/"
              class="border-b border-black/20 pb-2"
              @click="open = false"
            >
              Beranda
            </NuxtLink>
            <NuxtLink
              href="/about"
              class="border-b border-black/20 pb-2"
              @click="open = false"
            >
              Tentang Kami
            </NuxtLink>
            <NuxtLink
              href="/product"
              class="border-b border-black/20 pb-2"
              @click="open = false"
            >
              Produk
            </NuxtLink>
            <NuxtLink
              href="/contact"
              class="border-b border-black/20 pb-2"
              @click="open = false"
            >
              Kontak
            </NuxtLink>
            <NuxtLink
              v-if="!authStore.user"
              href="/login"
              class="border-b border-black/20 pb-2"
              @click="open = false"
            >
              Daftar
            </NuxtLink>
            <NuxtLink
              v-else
              href="/dashboard/profil"
              class="border-b border-black/20 pb-2"
              @click="open = false"
            >
              Dashboard
            </NuxtLink>
          </nav>
        </template>
      </USlideover>
    </div>
  </header>
</template>

<style scoped>
  .router-link-active {
    color: #33606b;
  }
</style>
