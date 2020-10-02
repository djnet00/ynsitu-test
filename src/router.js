import Vue from "vue";
import VueRouter from 'vue-router'
import { auth } from "@/firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/view/layout/Layout"),
    redirect: "/dashboard",
    meta: { requiresAuth: true },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/view/pages/Dashboard.vue")
      },
      {
        path: "/users",
        name: "users",
        component: () => import("@/view/pages/Users.vue")
      },
      {
        path: "/users-add",
        name: "usersAdd",
        component: () => import("@/view/pages/UserAdd.vue")
      },
      {
        path: "/users-edit/:id",
        name: "usersEdit",
        component: () => import("@/view/pages/UserEdit.vue")
      }
    ]
  },
  {
    path: "/error",
    name: "error",
    component: () => import("@/view/pages/error/Error.vue"),
    children: [
      {
        path: "error-1",
        name: "error-1",
        component: () => import("@/view/pages/error/Error-1.vue")
      }
    ]
  },
  {
    path: "/",
    component: () => import("@/view/pages/auth/Auth"),
    children: [
      {
        name: "login",
        path: "/login",
        component: () => import("@/view/pages/auth/Login")
      },
      {
        name: "register",
        path: "/register",
        component: () => import("@/view/pages/auth/Register")
      }
    ]
  },
  {
    path: "*",
    redirect: "/404"
  },
  {
    // the 404 route, when none of the above matches
    path: "/404",
    name: "404",
    component: () => import("@/view/pages/error/Error-1.vue")
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if( to.matched.some(record => record.meta.requiresAuth) ) {
    const user = auth.currentUser;

    if( !user ){
      next({path: '/login'});
    }else{
      next();
    }
  
  }else{
    next();
  }
});

export default router
