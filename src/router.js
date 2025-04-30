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
        path: "loans/create",
        name: "CreateLoan",
        component: () => import("./views/LoanFormView.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "users/create",
        name: "CreateUser",
        component: () => import("./views/UserFormView.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "loans/edit/:id",
        name: "EditLoan",
        component: () => import("./views/LoanFormView.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "users/edit/:id",
        name: "EditUser",
        component: () => import("./views/UserFormView.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "materials",
        name: "Materials",
        component: () => import("./views/MaterialsView.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "materials/create",
        name: "CreateMaterial",
        component: () => import("./views/MaterialFormView.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "materials/edit/:id",
        name: "EditMaterial",
        component: () => import("./views/MaterialFormView.vue"),
        meta: { requiresAuth: true },
      }
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
