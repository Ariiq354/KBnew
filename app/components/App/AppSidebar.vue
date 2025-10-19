<script setup lang="ts">
  import type { NavigationMenuItem } from "@nuxt/ui";
  import { useAuthStore } from "~/stores/auth";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  const authStore = useAuthStore();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isActive = computed(() => authStore.user?.isActive);

  const sidebarItems: NavigationMenuItem[] | NavigationMenuItem[][] = [
    authStore.hasPermission({ sidebar: ["admin"] })
      ? ([
          {
            label: "Dashboard",
            type: "label",
          },
          {
            label: "Home Dashboard",
            to: "/dashboard",
            icon: "i-lucide-home",
            onSelect: () => {
              if (!isDesktop.value) {
                constantStore.toggleSidebar();
              }
            },
          },
          {
            label: "Daftar Anggota",
            to: "/dashboard/anggota",
            icon: "i-lucide-user",
            onSelect: () => {
              if (!isDesktop.value) {
                constantStore.toggleSidebar();
              }
            },
          },
          {
            label: "Daftar Bootcamp",
            to: "/dashboard/bootcamp",
            icon: "i-lucide-computer",
            onSelect: () => {
              if (!isDesktop.value) {
                constantStore.toggleSidebar();
              }
            },
          },
          {
            label: "Daftar Diskon",
            to: "/dashboard/diskon",
            icon: "i-lucide-ticket-percent",
            onSelect: () => {
              if (!isDesktop.value) {
                constantStore.toggleSidebar();
              }
            },
          },
          {
            label: "Pengajuan Taaruf",
            to: "/dashboard/list-taaruf",
            icon: "i-lucide-users",
            onSelect: () => {
              if (!isDesktop.value) {
                constantStore.toggleSidebar();
              }
            },
          },
          {
            label: "Daftar Transaksi",
            to: "/dashboard/transaksi",
            icon: "i-lucide-shopping-cart",
            onSelect: () => {
              if (!isDesktop.value) {
                constantStore.toggleSidebar();
              }
            },
          },
          {
            label: "Daftar Tiket User",
            to: "/dashboard/tiket-user",
            icon: "i-lucide-ticket",
            onSelect: () => {
              if (!isDesktop.value) {
                constantStore.toggleSidebar();
              }
            },
          },
        ] as NavigationMenuItem[])
      : [],
    isDesktop.value
      ? ([
          {
            label: "Main",
            type: "label",
          },
          {
            label: "Pencarian Pasangan",
            to: "/dashboard/member",
            icon: "i-lucide-user",
            onSelect: () => {
              if (!isDesktop.value) {
                constantStore.toggleSidebar();
              }
            },
          },
          ...(isActive.value
            ? ([
                {
                  label: "Pengajuan Taaruf",
                  to: "/dashboard/pengajuan",
                  icon: "i-lucide-heart",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
              ] as NavigationMenuItem[])
            : []),
          {
            label: "Identitas Diri",
            to: "/dashboard/profil",
            icon: "i-lucide-user-circle",
            onSelect: () => {
              if (!isDesktop.value) {
                constantStore.toggleSidebar();
              }
            },
          },
          {
            label: "Paket Saya",
            to: "/dashboard/paket-saya",
            icon: "i-lucide-package",
            onSelect: () => {
              if (!isDesktop.value) {
                constantStore.toggleSidebar();
              }
            },
          },
        ] as NavigationMenuItem[])
      : [],
  ];
</script>

<template>
  <aside
    class="fixed top-0 z-20 hidden h-full w-72 overflow-auto border-r border-gray-200 bg-white shadow-xl transition-all duration-200 md:block dark:border-gray-700 dark:bg-gray-900"
    :class="constantStore.sidebarShow ? 'left-0' : '-left-72'"
  >
    <div class="flex items-center justify-center pt-8 pb-6 text-(--ui-primary)">
      <NuxtLink to="/" class="flex items-center gap-4 text-2xl tracking-widest">
        <NuxtImg src="/logo.webp" class="h-14 w-14" />
        <span>
          Keluarga <br />
          Bahagia
        </span>
      </NuxtLink>
    </div>
    <ClientOnly>
      <UNavigationMenu
        orientation="vertical"
        :items="sidebarItems"
        class="w-full"
        :ui="{
          label: 'text-sm uppercase text-(--ui-primary) mb-2',
          link: 'text-base py-2',
          root: 'px-4',
          separator: 'h-0',
        }"
      />
    </ClientOnly>
  </aside>
  <ClientOnly>
    <USlideover
      v-if="!isDesktop"
      v-model:open="constantStore.sidebarShow"
      side="left"
    >
      <template #title>
        <div class="flex items-center justify-center text-(--ui-primary)">
          <NuxtLink to="/" class="flex items-center gap-4 text-xl">
            <NuxtImg src="/logo.webp" class="h-10 w-10" />
            <span> Keluarga Bahagia </span>
          </NuxtLink>
        </div>
      </template>
      <template #body>
        <aside class="overflow-auto">
          <UNavigationMenu
            orientation="vertical"
            :items="sidebarItems"
            class="w-full"
            :ui="{
              label: 'text-sm uppercase text-(--ui-primary) mb-2',
              link: 'text-base py-2',
              separator: 'h-0',
            }"
          />
        </aside>
      </template>
    </USlideover>
    <div
      v-if="!isDesktop"
      class="fixed bottom-0 z-10 flex h-20 w-full justify-center gap-12 rounded-t-2xl bg-white shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)]"
    >
      <NuxtLink
        to="/dashboard/member"
        class="relative flex flex-col items-center justify-center"
      >
        <UIcon name="i-lucide-user" size="32" />
        <p class="text-xs">Jodoh</p>
      </NuxtLink>
      <NuxtLink
        v-if="isActive"
        to="/dashboard/pengajuan"
        class="flex flex-col items-center justify-center"
      >
        <UIcon name="i-lucide-heart" size="32" />
        <p class="text-xs">Ta'aruf</p>
      </NuxtLink>
      <NuxtLink
        to="/dashboard/paket-saya"
        class="flex flex-col items-center justify-center"
      >
        <UIcon name="i-lucide-package" size="32" />
        <p class="text-xs">Event</p>
      </NuxtLink>
      <NuxtLink
        to="/dashboard/profil"
        class="flex flex-col items-center justify-center"
      >
        <UIcon name="i-lucide-user-circle" size="32" />
        <p class="text-xs">Profil</p>
      </NuxtLink>
    </div>
  </ClientOnly>
</template>

<style scoped>
  .router-link-active {
    color: var(--color-primary-500);
  }

  .router-link-active .dot {
    display: block;
  }
</style>
