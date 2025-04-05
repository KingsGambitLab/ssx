import axios, { AxiosRequestConfig } from 'axios';

import map from 'lodash/map';
import pickBy from 'lodash/pickBy';

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
  'x-csrf-token'?: string | null,
  "X-Accept-Flash": boolean,
}

interface ApiOptions {
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


export async function apiRequest<T>(
  method: HttpMethods,
  path: string,
  body?: object,
  options: ApiOptions = {}
): Promise<T & {
  'csrf-error'?: string;
}> {
  const csrfToken = await fetchCsrfToken();

  console.log("csrfToken", csrfToken);

  const defaultHeaders: Headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'x-csrf-token': csrfToken,
    'X-Accept-Flash': true,
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

  const flashHeader = response.headers['x-flash-messages'] || response.headers['X-Flash-Messages'];
  let csrfError: string | undefined;

  if (flashHeader) {
    const { error, notice } = JSON.parse(flashHeader) || {};
    csrfError = error || notice;
  }

  return { ...response.data, csrfError };
}
