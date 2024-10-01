import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { signIn } from '@/core';
import { getToken } from '@/core/auth/utils';

import { client } from './client';
import { toCamelCase, toSnakeCase } from './utils';

const ACCESS_TOKEN = 'access-token';
const CLIENT_HEADER = 'client';
const UID_HEADER = 'uid';
const EXPIRY_HEADER = 'expiry';

const CONTENT_TYPE = 'Content-Type';
const MULTIPART_FORM_DATA = 'multipart/form-data';

export default function interceptors() {
  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const { headers, data } = config;

    const token = getToken();

    if (token) {
      const { access, client: _client, uid } = token;

      headers[ACCESS_TOKEN] = access;
      headers[CLIENT_HEADER] = _client;
      headers[UID_HEADER] = uid;
      headers[EXPIRY_HEADER] = token[EXPIRY_HEADER];
    }

    if (headers && headers[CONTENT_TYPE] !== MULTIPART_FORM_DATA && data) {
      config.data = toSnakeCase(config.data);
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => {
      const { data, headers } = response;
      response.data = toCamelCase(response.data);

      const token = headers[ACCESS_TOKEN];
      const _client = headers[CLIENT_HEADER];
      const uid = headers[UID_HEADER];
      const expiry = headers[EXPIRY_HEADER];

      if (token) {
        signIn({ access: token, client: _client, uid, expiry });
      }

      response.data = toCamelCase(data);

      return response;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
}
