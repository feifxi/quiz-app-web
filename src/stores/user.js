import { ref } from "vue";
import { defineStore, acceptHMRUpdate } from "pinia";

const API_ROOT = import.meta.env.VITE_API_ROOT

export const useAuthStore = defineStore("auth", () => {
  const authUser = ref(null);
  const isAuthenticated = ref(false);

  const checkAuth = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const res = await fetch(`${API_ROOT}/check-auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userId),
      });
      if (res.ok) {
        authUser.value = await res.json();
        isAuthenticated.value = true
        console.log(authUser.value)
      }
      else {
        throw new Error("Error in server") 
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong...")
    }
  };

  const setAuthUser = (userData) => {
    if (userData) {
      authUser.value = userData;
      isAuthenticated.value = true;
    } else {
      authUser.value = null;
      isAuthenticated.value = false;
    }
  };

  return { authUser, isAuthenticated, checkAuth, setAuthUser };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
