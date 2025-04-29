import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "./stores/auth";

// Importa los componentes
import Login from "./views/LoginView.vue";
import Dashboard from "./views/DashboardView.vue";
import Users from "./views/UsersView.vue";
import Loans from "./views/LoansView.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
    redirect: "/dashboard/users",
    children: [
      {
        path: "users",
        name: "Users",
        component: Users,
        meta: { requiresAuth: true },
      },
      {
        path: "loans",
        name: "Loans",
        component: Loans,
        meta: { requiresAuth: true },
      },
      {
        path: "users/create",
        name: "CreateUser",
        component: () => import("./views/UserFormView.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "users/edit/:id",
        name: "EditUser",
        component: () => import("./views/UserFormView.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated()) {
    next({ path: "/" });
  } else if (to.meta.requiresGuest && authStore.isAuthenticated()) {
    next({ path: "/dashboard" });
  } else {
    next();
  }
});

export default router;
