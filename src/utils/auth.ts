export const auth = {
  set(token: string, user: any) {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("auth_user", JSON.stringify(user));
  },

  getToken() {
    return localStorage.getItem("auth_token");
  },

  getUser() {
    const u = localStorage.getItem("auth_user");
    return u ? JSON.parse(u) : null;
  },

  clear() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  }
};