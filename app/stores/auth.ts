import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/vue";
import type { auth } from "~~/server/utils/auth";
import { ac, admin, user } from "~~/shared/permission";
import type { TStatement } from "~~/shared/permission";

const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(),
    adminClient({
      ac,
      roles: {
        admin,
        user,
      },
    }),
  ],
});

type TSignIn = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type TSignUp = {
  email: string;
  password: string;
  name: string;
  noTelepon: string;
};

export const useAuthStore = defineStore("useAuthStore", () => {
  const session = ref<Awaited<ReturnType<typeof authClient.useSession>> | null>(
    null
  );

  async function init() {
    loading.value = true;
    const data = await authClient.useSession(useFetch);
    session.value = data;
    loading.value = false;
  }

  const user = computed(() => session.value?.data?.user);
  const loading = ref(false);

  async function signIn(body: TSignIn) {
    loading.value = true;
    const headers = new Headers();
    await authClient.signIn.email({
      ...body,
      callbackURL: "/dashboard",
      fetchOptions: {
        headers,
        onError: (body) => {
          useToastError("Login Failed", body.error.message);
        },
      },
    });
    loading.value = false;
  }

  async function signUp(body: TSignUp) {
    loading.value = true;
    const headers = new Headers();
    await authClient.signUp.email({
      ...body,
      fetchOptions: {
        headers,
        onError: (body) => {
          useToastError("Register Failed", body.error.message);
        },
        onSuccess: () => {
          useToastSuccess("Register Sukses", "Silahkan login untuk masuk");
        },
      },
    });
    navigateTo("/login");
    loading.value = false;
  }

  async function signOut() {
    loading.value = true;
    const headers = new Headers();
    await authClient.signOut({
      fetchOptions: {
        headers,
        onError: (body) => {
          useToastError("Logout Failed", body.error.message);
        },
      },
    });
    navigateTo("/");
    loading.value = false;
  }

  async function hasPermission(body: TStatement) {
    const result = await authClient.admin.hasPermission({
      permissions: body,
    });

    return result.data?.success;
  }

  async function updateUser(body: { name?: string; noTelepon?: string }) {
    loading.value = true;
    await authClient.updateUser({
      ...body,
      fetchOptions: {
        onError: (body) => {
          useToastError("Update Failed", body.error.message);
        },
        onSuccess: () => {
          useToastSuccess("Update Success", "Your profile has been updated");
        },
      },
    });
    loading.value = false;
  }

  return {
    init,
    loading,
    signIn,
    signUp,
    user,
    signOut,
    hasPermission,
    updateUser,
    session,
  };
});
