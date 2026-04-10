const BASE = import.meta.env.VITE_API_BASE_URL;

export const api = {
  async request(endpoint: string, method: string, body?: any) {
    try {
      // 1. Get the token from storage (update key name if yours is different)
      const token = localStorage.getItem('auth_token');

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      // 2. If token exists, add the Bearer header
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const options: RequestInit = {
        method,
        headers,
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(`${BASE}/api${endpoint}`, options);
      
      // 3. Handle 401 Unauthorized (Optional: logout user or refresh token)
      if (response.status === 401) {
        console.warn("Unauthorized! Token might be expired.");
      }

      if (!response.ok) {
        throw new Error(`HTTP ${method} Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API ${method} Failure:`, error);
      return { success: false, error };
    }
  },

  get: (endpoint: string) => api.request(endpoint, 'GET'),
  post: (endpoint: string, data: any) => api.request(endpoint, 'POST', data),
  put: (endpoint: string, data: any) => api.request(endpoint, 'PUT', data),
  patch: (endpoint: string, data: any) => api.request(endpoint, 'PATCH', data),
  delete: (endpoint: string) => api.request(endpoint, 'DELETE'),
};