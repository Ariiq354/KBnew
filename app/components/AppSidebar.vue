<script setup lang="ts">
  import type { NavigationMenuItem } from "@nuxt/ui";

  const constantStore = useConstantStore();
  const authStore = useAuthStore();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isActive = computed(() => authStore.user?.isActive);

  const sidebarItems: NavigationMenuItem[] | NavigationMenuItem[][] = [
    (await authStore.hasPermission({ sidebar: ["admin"] }))
      ? ([
          {
            label: "Dashboard",
            type: "label",
          },
          {
            label: "Home Dashboard",
            to: "/dashboard",
            icon: "i-heroicons-home",
          },
          {
            label: "Daftar Anggota",
            to: "/dashboard/anggota",
            icon: "i-heroicons-user",
          },
          {
            label: "Daftar Bootcamp",
            to: "/dashboard/bootcamp",
            icon: "i-heroicons-computer-desktop",
          },
          {
            label: "Daftar Diskon",
            to: "/dashboard/diskon",
            icon: "i-heroicons-percent-badge",
          },
          {
            label: "Pengajuan Taaruf",
            to: "/dashboard/list-taaruf",
            icon: "i-heroicons-users",
          },
          {
            label: "Daftar Transaksi",
            to: "/dashboard/transaksi",
            icon: "i-heroicons-shopping-cart",
          },
        ] as NavigationMenuItem[])
      : [],
    [
      {
        label: "Main",
        type: "label",
      },
      ...(isActive.value
        ? ([
            {
              label: "Pencarian Pasangan",
              to: "/dashboard/member",
              icon: "i-heroicons-user",
            },
            {
              label: "Pengajuan Taaruf",
              to: "/dashboard/pengajuan",
              icon: "i-heroicons-heart",
            },
          ] as NavigationMenuItem[])
        : []),
      {
        label: "Identitas Diri",
        to: "/dashboard/profil",
        icon: "i-heroicons-user-circle",
      },
      {
        label: "Paket Saya",
        to: "/dashboard/paket-saya",
        icon: "i-heroicons-cube",
      },
    ],
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
      title="Menu"
    >
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
  </ClientOnly>
</template>
