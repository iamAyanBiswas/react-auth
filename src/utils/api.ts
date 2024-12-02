import { useAuth } from '../hooks/useAuth';

export const useAuthenticatedRequest = () => {
  const { getAccessToken } = useAuth();

  const authenticatedRequest = async (url: string, options: RequestInit = {}) => {
  
    const token = await getAccessToken();
    if (!token) {
      throw new Error('Not authenticated');
    }

    const headers = new Headers(options.headers);
    headers.set('Authorization', `Bearer ${token}`);

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      throw new Error('Authentication failed');
    }

    return response;
  };

  return authenticatedRequest;
};

