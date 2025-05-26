import type { UserWithId } from "../utils/auth";

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });
  event.context.user = session?.user as unknown as UserWithId;
  if (event.path.startsWith("/dashboard") && !session?.user) {
    await sendRedirect(event, "/", 302);
  }

  if (
    session?.user &&
    (event.path === "/login" || event.path === "/register")
  ) {
    await sendRedirect(event, "/dashboard", 302);
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

declare module "h3" {
  interface H3EventContext {
    user: UserWithId | undefined;
  }
}
