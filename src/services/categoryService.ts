import { api } from '../utils/api';

export interface Category {
  id: number | string;
  name: string;
  description?: string;
}

export const CategoryService = {
  fetchAllCategories: async (): Promise<Category[]> => {
    try {
      const response = await api.get('/categories');
      const apiData = response.data;

      // Handle the { data: [...] } structure
      if (apiData?.data && Array.isArray(apiData.data)) {
        return [
          { id: 'all', name: 'All' }, // Our manual "All" entry
          ...apiData.data
        ];
      }
      
      // Fallback if the array is direct
      if (Array.isArray(apiData)) {
        return [{ id: 'all', name: 'All' }, ...apiData];
      }

    } catch (error) {
      console.error('Category fetch failed:', error);
    }

    return [{ id: 'all', name: 'All' }];
  }
};