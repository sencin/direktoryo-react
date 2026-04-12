import { api } from '../utils/api';


const mapResourceToBook = (item: any) => {
  return {
    ...item,
    id: item.id,
    title: item.name,
    author: item.creator,
    description: item.description,
    url: item.official_url,
    tag: item.media_type,
    image_url: item.image_url,
    is_saved: item.is_saved ?? 0,
  };
};


export const ResourceService = {
  fetchAllResource: async () => {
    try {
      const response = await api.get('/resources');

      const data =
        response?.data?.data ??
        response?.data ??
        [];

      return Array.isArray(data)
        ? data.map(mapResourceToBook)
        : [];

    } catch (error) {
      console.error('Resource fetch failed:', error);
      return [];
    }
  },

  fetchByCategoryId: async (id: number | string) => {
    try {
      const response = await api.get(`/resources?category_id=${id}`);

      const data =
        response?.data?.data ??
        response?.data ??
        [];

      return Array.isArray(data)
        ? data.map(mapResourceToBook)
        : [];

    } catch (error) {
      console.error('Fetch by category failed:', error);
      return [];
    }
  },

  search: async (searchTerm: string, categoryId?: number | string) => {
    try {
  
      let endpoint = `/resources?search=${encodeURIComponent(searchTerm)}`;
      
      if (categoryId) {
        endpoint += `&category_id=${categoryId}`;
      }

      const response = await api.get(endpoint);

      const data =
        response?.data?.data ??
        response?.data ??
        [];

      return Array.isArray(data)
        ? data.map(mapResourceToBook)
        : [];

    } catch (error) {
      console.error('Search query failed:', error);
      return [];
    }
  }
};