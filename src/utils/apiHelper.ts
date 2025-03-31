import axios, { AxiosRequestConfig } from 'axios';
import map from 'lodash/map';
import pickBy from 'lodash/pickBy';

export enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

interface RequestOptions {
  method: HttpMethods,
  body?: object | string
}


interface Headers {
  Accept: string,
  'Content-Type'?: string,
  'X-Requested-With': string,
  'App-name'?: string,
}

interface ApiOptions {
  headers?: object;
  params?: object;
  type?: string;
  dataType?: string,
  cache?: string,
  next?: {
    revalidate: number,
  }
}

export function isNullOrUndefined(data: unknown) {
  return (data === null || data === undefined);
}

export function searchParams(params: object, transformArray: boolean = false) {
  const cleanedParams = pickBy(params, (v) => !isNullOrUndefined(v));
  return map(cleanedParams, (value: unknown, key) => {
    if (transformArray && Array.isArray(value)) {
      return value.map((v) => `${key}[]=${v}`).join('&');
    } else {
      return `${key}=${value}`;
    }
  }).join('&');
}


export async function apiRequest<T>(
  method: HttpMethods,
  path: string,
  body?: object,
  options: ApiOptions = {}
): Promise<T> {
  const defaultHeaders: Headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  };

  const defaultOptions: RequestOptions = { method }

  if (options.dataType === 'FormData') {
    delete defaultHeaders['Content-Type'];
    defaultOptions.body = body as FormData;
  } else if (body && method !== 'GET') {
    defaultOptions.body = JSON.stringify(body);
  }

  const { headers, params, ...remainingOptions } = options;

  // finalOptions.referrer = getURLWithUTMParams();
  if (params) {
    path += `?${searchParams(params)}`;
  } else if (method === 'GET' && body) {
    path += `?${searchParams(body, true)}`;
  }

  const finalOptions: AxiosRequestConfig = {
    method,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    data: body,
    ...remainingOptions,
  };

  // @ts-expect-error
  const response = await axios(path, finalOptions);
  return response.data;
}