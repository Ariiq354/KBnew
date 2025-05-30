import type { UserWithId } from "../utils/auth";

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });
  event.context.user = session?.user as unknown as UserWithId;
  if (event.path.startsWith("/dashboard") && !session?.user) {
    await sendRedirect(event, "/", 302);
  }

  const user = session?.user;

  if (user && (event.path === "/login" || event.path === "/register")) {
    await sendRedirect(event, "/dashboard", 302);
  }

  if (
    user &&
    user.isActive === false &&
    (event.path === "/dashboard/member" ||
      event.path === "/dashboard/pengajuan")
  ) {
    await sendRedirect(event, "/dashboard/daftar", 302);
  }

  if (
    user &&
    user.role !== "admin" &&
    PROTECTED.some((item) => item === event.path)
  ) {
    await sendRedirect(event, "/dashboard/member", 302);
  }

  // if (session?.user) {cc
  //   const routePermissions: string[] = [
  //     "/dashboard/athar",
  //     "/dashboard/saham",
  //     "/dashboard/keuangan",
  //     "/dashboard/monitoring",
  //     "/dashboard/persetujuan",
  //     "/dashboard/transaksi",
  //   ];

  // const isRestricted = routePermissions.some(
  //   (route) => currentRoute.includes(route) && session?.user?.role !== "admin"
  // );

  // if (isRestricted) {
  //   return navigateTo("/dashboard");
  // }
});

const PROTECTED = ["/dashboard", "/dashboard/user", "/dashboard/list-taaruf"];

declare module "h3" {
  interface H3EventContext {
    user: UserWithId | undefined;
  }
}
