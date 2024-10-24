// import { checkIfUserIsAuthenticated } from '../router/auth.js';

const routes = [


    {
      path: "/",
      component: () => import("pages/SignIn_Page.vue"),
    },

    {
        path: "/signup",
        component: () => import("pages/SignUp_Page.vue"),
      },

    {
      path: '/admin',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        { path: 'admin-dashboard', name: 'dashboard', component: () => import('pages/Dashboard.vue') },
        { path: 'pos/reports', component: () => import('pages/PosReports.vue') },
        { path: 'settings', component: () => import('pages/Settings.vue') },
      ],


        path: '/pos', // Base path for POS section
        component: () => import('layouts/MainLayout.vue'),
        children: [
          { path: 'new-sale',
            name: 'new-sale',
            component: () => import('components/PosNewSale.vue') }, // NewSale route
          { path: 'product-add',
            name: 'product-add',  // Add this to make name-based routing work
            component: () => import('components/PosProductAdd.vue') }, //AddProduct
          { path: 'categories', component: () => import('components/PosCategory.vue') },
          {
            path: 'orders',
            name: 'orders',
            component: () => import('components/PosOrders.vue')
          },
          {
            path: 'details/:id', // This will now receive the encoded order_number
            name: 'pos-order-details',
            component: () => import('components/PosViewDetails.vue'),

          },
          { path: 'products', component: () => import('components/PosProducts.vue') },

                // Add the new route for PosPrintOrder here

          {
            path: 'print-order/:id',
            name: 'pos-print-order',
            component: () => import('components/PosPrintOrder.vue')
          }
        ]
      },




    // {
    //   path: '/pos', // Base path for POS section
    //   component: () => import('layouts/MainLayout.vue'),
    //   children: [
    //     { path: 'new-sale',
    //       name: 'new-sale',
    //       component: () => import('components/PosNewSale.vue') }, // NewSale route
    //     { path: 'product-add',
    //       name: 'product-add',  // Add this to make name-based routing work
    //       component: () => import('components/PosProductAdd.vue') }, //AddProduct
    //     { path: 'categories', component: () => import('components/PosCategory.vue') },
    //     {
    //       path: 'orders',
    //       name: 'orders',
    //       component: () => import('components/PosOrders.vue')
    //     },
    //     {
    //       path: 'details/:id', // This will now receive the encoded order_number
    //       name: 'pos-order-details',
    //       component: () => import('components/PosViewDetails.vue'),

    //     },
    //     { path: 'products', component: () => import('components/PosProducts.vue') },

    //           // Add the new route for PosPrintOrder here

    //     {
    //       path: 'print-order/:id',
    //       name: 'pos-print-order',
    //       component: () => import('components/PosPrintOrder.vue')
    //     }
    //   ]
    // },

    {
      path: '/orders', // Base path for ORDER MANGEMENT section
      component: () => import('layouts/MainLayout.vue'),
      children: [
        { path: 'all', component: () => import('components/OMAllOrders.vue') }, // NewSale route
        { path: 'pending', component: () => import('components/OMPendingOrders.vue') },
        { path: 'confirm', component: () => import('components/OMConfirmOrders.vue') },
        { path: 'processing', component: () => import('components/OMProcessingOrders.vue') },
        { path: 'out-for-delivery', component: () => import('components/OMOutforDeliveryOrders.vue') },
        { path: 'delivered', component: () => import('components/OMDeliveredOrders.vue') },
        { path: 'returned', component: () => import('components/OMReturnedOrders.vue') },
        { path: 'canceled', component: () => import('components/OMCanceledOrders.vue') },
      ]
    },

    {
      path: '/products', // Base path for PRODUCT MANAGEMENT section
      component: () => import('layouts/MainLayout.vue'),
      children: [
        { path: 'add', component: () => import('components/PMAddProduct.vue') }, // NewSale route
        { path: 'list', component: () => import('components/PMProductList.vue') },
        { path: 'history', component: () => import('components/PMHistory.vue') },
        { path: 'categories', component: () => import('components/PMCategory.vue') },
      ]
    },


    {
      path: '/users', // Base path for CUSTOMER LIST section
      component: () => import('layouts/MainLayout.vue'),
      children: [
        { path: 'customers', component: () => import('components/CustomerList.vue') } // NewSale route

      ]
    },
    {
      path: '/support', // Base path for MESSAGE section
      component: () => import('layouts/MainLayout.vue'),
      children: [
        { path: 'message', component: () => import('components/Messages.vue') }

      ]
    },

    {
      path: '/reports', // Base path for REPORTS section
      component: () => import('layouts/MainLayout.vue'),
      children: [
        { path: 'earnings', component: () => import('components/RAEarnigs.vue') },
        { path: 'orders', component: () => import('components/RAOrders.vue') },
        { path: 'inventory', component: () => import('components/RAInventory.vue') },
        { path: 'expenses', component: () => import('components/RAExpenses.vue') }

      ]
    },

    {
      path: '/users',
      component: () => import('layouts/UserMainLayout.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('pages/Home_Page.vue')
        },
        {
          path: '/favorites',
          name: 'favorites',
          component: () => import('pages/Hearts_Page.vue')
        },
        {
          path: '/order',
          name: 'order',
          component: () => import('pages/Order_Page.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('pages/UpdateProfile_Page.vue')
        },
        {
          path: '/menu',
          name: 'menu',
          component: () => import('pages/Menu_Page.vue')
        },
        // Additional user routes
        {
          path: '/cart',
          component: () => import('pages/Cart_Page.vue')
        },
        {
          path: '/checkout',
          component: () => import('pages/CheckOut_Page.vue')
        },
        {
          path: '/details',
          component: () => import('pages/Details_Page.vue')
        },
        {
          path: '/updateprofile',
          component: () => import('pages/UpdateProfile_Page.vue')
        },
        {
          path: '/rating',
          component: () => import('pages/Rating_Page.vue')
        },
        {
          path: '/my-order',
          component: () => import('pages/MyOrderPage.vue')
        },
        {
          path: '/order-details/:id',
          component: () => import('pages/OrderDetailsPage.vue')
        },
        {
          path: '/notifications',
          component: () => import('pages/NotificationsPage.vue')
        },
        {
          path: '/address',
          component: () => import('pages/AddressPage.vue')
        },
        {
          path: '/messages',
          component: () => import('pages/MessagesPage.vue')
        },
        {
          path: '/delete-account',
          component: () => import('pages/DeleteAccountPage.vue')
        },
        {
          path: '/logout',
          component: () => import('pages/LogoutPage.vue')
        },
      ]
    },



    // {
    //     path: "/home",
    //     component: () => import("pages/Home_Page.vue"),
    //   },
    //   {
    //     path: "/menu",
    //     component: () => import("pages/Menu_Page.vue"),
    //   },
    //   {
    //     path: '/favorites',
    //     component: () => import('pages/Hearts_Page.vue')
    //   },
    //   {
    //     path: '/order',
    //     component: () => import('pages/Order_Page.vue')
    //   },
    //   {
    //     path: "/cart",
    //     component: () => import("pages/Cart_Page.vue"),
    //   },
    //   {
    //     path: "/checkout",
    //     component: () => import("pages/CheckOut_Page.vue"),
    //   },
    //   {
    //     path: "/details",
    //     component: () => import("pages/Details_Page.vue"),
    //   },
    //   {
    //     path: "/updateprofile",
    //     component: () => import("pages/UpdateProfile_Page.vue"),
    //   },
    //   {
    //     path: "/rating",
    //     component: () => import("pages/Rating_Page.vue"),
    //   },
    //   {
    //     path: "/profile",
    //     component: () => import("pages/Profile_Page.vue"),
    //   },
    //   {
    //     path: "/my-order",
    //     component: () => import("pages/MyOrderPage.vue"),
    //   },
    //   {
    //     path: "/order-details/:id",
    //     component: () => import("pages/OrderDetailsPage.vue"),
    //   },
    //   {
    //     path: "/notifications",
    //     component: () => import("pages/NotificationsPage.vue"),
    //   },
    //   {
    //     path: "/address",
    //     component: () => import("pages/AddressPage.vue"),
    //   },
    //   {
    //     path: "/messages",
    //     component: () => import("pages/MessagesPage.vue"),
    //   },
    //   {
    //     path: "/delete-account",
    //     component: () => import("pages/DeleteAccountPage.vue"),
    //   },
    //   {
    //     path: "/logout",
    //     component: () => import("pages/LogoutPage.vue"),
    //   },

    // Always leave this as last one,
    // but you can also remove it
    {
      path: '/:catchAll(.*)*',
      component: () => import('pages/ErrorNotFound.vue')
    }
  ];

  export default routes;
