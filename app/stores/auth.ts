import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/vue";
import type { auth } from "~~/server/utils/auth";
import { ac, admin, user, type TStatement } from "~~/shared/permission";

const authClient = createAuthClient({
  basePath: "/api/v1/auth",
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
  const sessionRef = authClient.useSession();
  const user = computed(() => sessionRef.value.data?.user);
  const session = computed(() => sessionRef.value.data?.session);
  const loading = computed(() => sessionRef.value.isPending);

  async function signIn(body: TSignIn) {
    await authClient.signIn.email({
      ...body,
      fetchOptions: {
        onError: (body) => {
          useToastError("Login Failed", body.error.message);
        },
        onSuccess: () => {
          useToastSuccess("Login Success", "Selamat datang di Berkah Amanah");
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
        onSuccess: () => {
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
