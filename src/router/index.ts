import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "",
      redirect: "/dashboard",
    },
    {
      path: "/login",
      name: "Login",
      component: () =>
        import(
          /* webpackChunkName: "authentication" */ "../views/Authentication/Login.vue"
        ),
    },
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "admin" */ "../views/HomeView.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: () => import("../views/DashboardView.vue"),
        },
        {
          path: "farmers",
          name: "FarmersList",
          component: () => import("../views/Farmers/FarmersList.vue"),
        },
        {
          path: "farmer/:farmerId",
          name: "FarmerView",
          component: () => import("../views/Farmers/FarmerView.vue"),
        },
        {
          path: "loans",
          name: "LoansList",
          component: () => import("../views/Loans/LoansList.vue"),
        },
        {
          path: "deposits",
          name: "DepositsList",
          component: () => import("../views/DepositsList.vue"),
        },
        {
          path: "admin",
          name: "AdminView",
          component: () => import("../views/AdminView.vue"),
        },
        {
          path: "batch_management",
          name: "BatchManagement",
          component: () => import("../views/BatchImportsView.vue"),
        },
      ],
    },

    {
      path: "/internal-server-error",
      name: "InternalServerError",
      component: () =>
        import(
          /* webpackChunkName: "errors" */ "../views/Errors/InternalServerError.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/forbidden",
      name: "Forbidden",
      component: () =>
        import(
          /* webpackChunkName: "errors" */ "../views/Errors/Forbidden.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/unauthorized",
      name: "Unauthorized",
      component: () =>
        import(
          /* webpackChunkName: "errors" */ "../views/Errors/Unauthorized.vue"
        ),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "PageNotFound",
      component: () =>
        import(
          /* webpackChunkName: "errors" */ "../views/Errors/PageNotFound.vue"
        ),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("access_token");
  // const role = localStorage.getItem("role") || "user";
  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated)
    next({ name: "Login" });
  // else if (
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   to.matched.some((record) => record.meta.requiresRole) &&
  //   !to.meta.requiresRole.includes(role)
  // )
  //   next({ name: "Forbidden" });
  else next();
  // next();
});

export default router;
