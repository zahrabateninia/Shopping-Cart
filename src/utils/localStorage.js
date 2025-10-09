export const storage = {
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Error saving ${key} to localStorage:`, err);
    }
  },

  get(key, fallback = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (err) {
      console.error(`Error reading ${key} from localStorage:`, err);
      return fallback;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error(`Error removing ${key} from localStorage:`, err);
    }
  },
};

// User-related 
export const userStorage = {
  getAllUsers() {
    return storage.get("users", []);
  },

  saveAllUsers(users) {
    storage.set("users", users);
  },

  getCurrentUser() {
    return storage.get("user", null);
  },

  saveCurrentUser(user) {
    storage.set("user", user);
  },

  removeCurrentUser() {
    storage.remove("user");
  },
};

//  Cart-related 
export const cartStorage = {
  getUserCart(email) {
    return storage.get(`cart_${email}`, { itemsById: {}, ids: [] });
  },

  saveUserCart(email, cartState) {
    storage.set(`cart_${email}`, cartState);
  },

  clearUserCart(email) {
    storage.remove(`cart_${email}`);
  },
};
