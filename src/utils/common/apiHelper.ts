import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import map from 'lodash/map';
import pickBy from 'lodash/pickBy';

import { ResponseError } from '@modules/common/errors';
import { fetchCsrfToken, getURLWithUTMParams } from '@utils/common/url';

export enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

interface RequestOptions {
  method: HttpMethods,
  body?: object | string,
  referrer?: string,
}

interface Headers {
  Accept: string,
  'Content-Type'?: string,
  'X-Requested-With': string,
  'App-name'?: string,
  'X-Csrf-Token'?: string | null,
  "X-Accept-Flash": boolean,
  "X-User-Token": string | null,
}

export interface ApiOptions {
  headers?: object;
  params?: object;
  type?: string;
  dataType?: string,
  cache?: string,
  referrer?: string,
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

export async function parseResponse<T>(response: AxiosResponse, type?: string): Promise<T> {
  const data = response.data;
  const contentType = response.headers['content-type'];
  let parsedData: string | object | null = null;
  try {
    if (contentType === null) {
      return await Promise.resolve(null) as unknown as T;
    } else if (contentType.startsWith('text/plain') || type === 'text') {
      parsedData = await data.text();
    } else if (contentType.startsWith('application/json')) {
      parsedData = await data.json();
    } else {
      parsedData = await data.text();
      // Turbolink error check
      if (data?.includes && data.includes('Turbolinks')) {
        throw new ResponseError('Turbolinks detected', true, response, data);
      }
    }
  } catch (error) {
    // TODO Do something if response has no, or invalid JSON
    console.log('Error', error);
    console.log('Response : ', response);
  }

  if (data?.includes && data.includes('Turbolinks')) {
    throw new ResponseError('Turbolinks detected', true, response, parsedData);
  }

  if (response.status >= 200 && response.status < 300) {
    return data;
  }

  throw new ResponseError(response.statusText, true, response, data);
}

let csrfTokenPromise: Promise<string | null> | null = null;

const getCsrfToken = async () => {
  if (!csrfTokenPromise) {
    csrfTokenPromise = fetchCsrfToken();
  }
  return csrfTokenPromise;
};

export async function apiRequest<T>(
  method: HttpMethods,
  path: string,
  body?: object,
  options: ApiOptions = {}
): Promise<T & {
  'csrf-error'?: string;
}> {
  const csrfToken = await getCsrfToken();

  const defaultHeaders: Headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'X-Csrf-Token': csrfToken || '',
    'X-Accept-Flash': true,
    'X-User-Token': '',
  };

  const defaultOptions: RequestOptions = { method }

  if (options.dataType === 'FormData') {
    delete defaultHeaders['Content-Type'];
    defaultOptions.body = body as FormData;
  } else if (body && method !== 'GET') {
    defaultOptions.body = JSON.stringify(body);
  }

  const { headers, params, ...remainingOptions } = options;

  if (typeof window !== 'undefined') {
    defaultOptions.referrer = getURLWithUTMParams(window.location.href);
  }
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


  const response = await axios(path, finalOptions);
  try {
    return await parseResponse(response, options.type);
  } catch (e) {
    console.error('URL: ', path);
    console.error('Options: ', finalOptions);
    throw e;
  }
}
