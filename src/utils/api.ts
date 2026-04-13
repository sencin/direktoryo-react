const BASE = import.meta.env.VITE_API_BASE_URL;

export const api = {
  async request(endpoint: string, method: string, body?: any) {
    try {
      // 1. Get the token from storage (update key name if yours is different)
      const token = localStorage.getItem('auth_token');

      const isFormData = body instanceof FormData;

      const headers: Record<string, string> = {};

      if (!isFormData) {
        headers['Content-Type'] = 'application/json';
      }


      // 2. If token exists, add the Bearer header
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const options: RequestInit = {
        method,
        headers,
        body: isFormData ? body : (body ? JSON.stringify(body) : undefined),
      };


      const response = await fetch(`${BASE}/api${endpoint}`, options);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw { 
          status: response.status, 
          message: errorData.error || `HTTP ${method} Error`,
        };
      }

      return await response.json();
    } catch (error) {
       console.error(`API ${method} Failure:`, error);
      // RE-THROW so the calling function knows it failed
      throw error;
    }
  },

  get: (endpoint: string) => api.request(endpoint, 'GET'),
  post: (endpoint: string, data: any) => api.request(endpoint, 'POST', data),
  put: (endpoint: string, data: any) => api.request(endpoint, 'PUT', data),
  patch: (endpoint: string, data: any) => api.request(endpoint, 'PATCH', data),
  delete: (endpoint: string) => api.request(endpoint, 'DELETE'),
};