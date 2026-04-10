import { api } from '../utils/api';

/**
 * 1. DATA MAPPING
 * Converts raw API items into our internal "Book" format.
 */
const mapResourceToBook = (item: any) => {
  return {
    ...item,
    id: item.id,
    title: item.name,
    author: item.creator,
    description: item.description,
    url: item.official_url,
    tag: item.media_type,
    image_url: item.image_url
  };
};

/**
 * 2. INDIVIDUAL FETCH FUNCTIONS
 */

// Fetches the global pool of resources
const fetchAllResources = async () => {
  const response = await api.get('/collections/resources');

  if (response.success) {

    
    return response.data.map(mapResourceToBook);
  }

  return [];
};

// Fetches resources for a specific ID
const fetchResourcesByCollection = async (collectionId: string) => {
  const response = await api.get(`/collections/${collectionId}/resources`);

  if (response.success) {
    return response.data.map(mapResourceToBook);
  }

  return [];
};

/**
 * 3. EXPORTED SERVICE
 */
export const CollectionService = {
  
  async getCollectionBooks(activeCollection: string) {
    try {
      // Routing logic: which task should we perform?
      if (activeCollection === 'All') {
        const allBooks = await fetchAllResources();
        return allBooks;
      }

      const collectionBooks = await fetchResourcesByCollection(activeCollection);
      return collectionBooks;
      
    } catch (error) {
      console.error("ResourceService Error:", error);
      return [];
    }
  }
};