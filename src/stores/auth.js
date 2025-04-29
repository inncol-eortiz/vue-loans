import { defineStore } from "pinia";
import { ref } from "vue";
import { signIn } from "../lib/api";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(localStorage.getItem("serviceToken") || null);

  const login = async (email, password) => {
    try {
      const response = await signIn(email, password);
      token.value = response.data.access_token;
      user.value = response.data.user;

      localStorage.setItem("serviceToken", token.value);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;

    localStorage.removeItem("serviceToken");
  };

  const isAuthenticated = () => !!token.value;

  return { user, token, login, logout, isAuthenticated };
});