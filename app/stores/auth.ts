import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/vue";
import type { auth } from "~~/server/utils/auth";
import { ac, admin, user, type TStatement } from "~~/shared/permission";

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
    const data = await authClient.useSession(useFetch);
    session.value = data;
  }

  const user = computed(() => session.value?.data?.user);
  const loading = computed(() => session.value?.isPending);

  async function signIn(body: TSignIn) {
    await authClient.signIn.email({
      ...body,
      fetchOptions: {
        onError: (body) => {
          useToastError("Login Failed", body.error.message);
        },
        onSuccess: async () => {
          useToastSuccess("Login Success", "Selamat datang di Berkah Amanah");
          await init();

          navigateTo("/dashboard");
        },
      },
    });
  }

  async function signUp(body: TSignUp) {
    await authClient.signUp.email({
      ...body,
      fetchOptions: {
        onError: (body) => {
          useToastError("Register Failed", body.error.message);
        },
        onSuccess: () => {
          useToastSuccess("Register Success", "Silahkan login untuk masuk");
          navigateTo("/login");
        },
      },
    });
  }

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onError: (body) => {
          useToastError("Logout Failed", body.error.message);
        },
        onSuccess: async () => {
          await init();
          navigateTo("/");
        },
      },
    });
  }

  async function hasPermission(body: TStatement) {
    const result = await authClient.admin.hasPermission({
      permissions: body,
    });

    return result.data?.success;
  }

  async function updateUser(body: { name?: string; noTelepon?: string }) {
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
