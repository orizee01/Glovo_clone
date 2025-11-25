const adminRoles = [
  {
    "name": "Super Admin",
    "created_by": null,
    "description": "Full access to all admin features, including platform settings, users, orders, and analytics.",
    "permissions": {
      "dashboard": { "view": true },
      "order_management": { "create": true, "read": true, "update": true, "delete": true },
      "restaurant_management": { "create": true, "read": true, "update": true, "delete": true },
      "menu_management": { "create": true, "read": true, "update": true, "delete": true },
      "rider_management": { "create": true, "read": true, "update": true, "delete": true },
      "user_management": { "create": true, "read": true, "update": true, "delete": true },
      "role_management": { "create": true, "read": true, "update": true, "delete": true },
      "audit_logs": { "read": true },
      "promo_management": { "create": true, "read": true, "update": true, "delete": true },
      "settings": { "read": true, "update": true }
    }
  },
  {
    "name": "Order Manager",
    "created_by": null,
    "description": "Can view and manage all customer orders and assign riders.",
    "permissions": {
      "dashboard": { "view": true },
      "order_management": { "create": true, "read": true, "update": true },
      "rider_management": { "read": true, "update": true },
      "restaurant_management": { "read": true },
      "menu_management": { "read": true }
    }
  },
  {
    "name": "Restaurant Manager",
    "created_by": null,
    "description": "Can manage restaurant details, menus, and view orders related to their restaurant.",
    "permissions": {
      "dashboard": { "view": true },
      "restaurant_management": { "create": true, "read": true, "update": true },
      "menu_management": { "create": true, "read": true, "update": true },
      "order_management": { "read": true }
    }
  },
  {
    "name": "Rider Coordinator",
    "created_by": null,
    "description": "Manages rider assignments and availability.",
    "permissions": {
      "rider_management": { "create": true, "read": true, "update": true, "delete": true },
      "order_management": { "read": true },
      "dashboard": { "view": true }
    }
  },
  {
    "name": "Analytics Viewer",
    "created_by": null,
    "description": "Can view analytics and reports but cannot make changes to the system.",
    "permissions": {
      "dashboard": { "view": true },
      "analytics": { "read": true }
    }
  },
  {
    "name": "Support Agent",
    "created_by": null,
    "description": "Can view customer issues and assist with order-related queries.",
    "permissions": {
      "dashboard": { "view": true },
      "order_management": { "read": true },
      "user_management": { "read": true }
    }
  },
  {
    "name": "Promotions Manager",
    "created_by": null,
    "description": "Can create and manage promotional campaigns.",
    "permissions": {
      "dashboard": { "view": true },
      "promo_management": { "create": true, "read": true, "update": true, "delete": true }
    }
  },
  {
    "name": "Settings Manager",
    "created_by": null,
    "description": "Can manage platform settings and configurations.",
    "permissions": {
      "settings": { "read": true, "update": true },
      "dashboard": { "view": true }
    }
  }
];

export default adminRoles;


