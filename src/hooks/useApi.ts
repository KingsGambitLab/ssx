import useToken from '@hooks/useToken';
import { apiRequest, HttpMethods, ApiOptions } from '@utils/common/apiHelper';

export function useApi() {
  const { data: token } = useToken();

  const request = async <T>(
    method: HttpMethods,
    path: string,
    body?: object,
    options: ApiOptions = {}
  ): Promise<T> => {
    const headers = {
      ...options.headers,
      'X-User-Token': token || '',
    };

    return apiRequest<T>(
      method,
      path,
      body,
      { ...options, headers }
    );
  };

  return { request };
} 