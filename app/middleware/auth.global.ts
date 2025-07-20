export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  await authStore.init();

  // Base Protection
  if (to.path.startsWith("/dashboard") && !authStore.user) {
    return navigateTo("/");
  }

  if (authStore.user && (to.path === "/login" || to.path === "/register")) {
    return navigateTo("/dashboard");
  }

  if (authStore.user?.role !== "admin" && to.path === "/dashboard") {
    return navigateTo("/dashboard/profil");
  }

  // Active Member protection
  if (
    authStore.user &&
    authStore.user.isActive === false &&
    (to.path === "/dashboard/member" || to.path === "/dashboard/pengajuan")
  ) {
    return navigateTo("/dashboard/profil");
  }

  // Admin Path Protection
  if (
    authStore.user &&
    authStore.user.role !== "admin" &&
    ADMIN_PROTECTED.some((item) => item === to.path)
  ) {
    return navigateTo("/dashboard/profil");
  }
});

const ADMIN_PROTECTED = [
  "/dashboard",
  "/dashboard/anggota",
  "/dashboard/bootcamp",
  "/dashboard/list-taaruf",
];
