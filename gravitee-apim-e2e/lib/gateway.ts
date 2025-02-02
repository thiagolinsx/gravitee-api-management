/*
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import 'dotenv/config';
import fetchApi, { Response } from 'node-fetch';

export type HttpMethod = 'GET' | 'PUT' | 'POST' | 'DELETE';

export async function fetchGateway(
  contextPath: string,
  method: HttpMethod = 'GET',
  body?: string,
  timeBetweenRetries = 500,
  failAfterMs = 7000,
): Promise<Response> {
  try {
    console.log('Try to fetch gateway', contextPath, failAfterMs);
    const response = await fetchApi(`${process.env.GATEWAY_BASE_PATH}${contextPath}`, {
      method,
      body,
    });
    if (response.status == 404) {
      throw new Error(`Gateway [${process.env.GATEWAY_BASE_PATH}${contextPath}] not found. Retry...`);
    }
  } catch (e) {
    return new Promise((successCallback, failureCallback) => {
      setTimeout(() => {
        if (failAfterMs - timeBetweenRetries <= 0) {
          failureCallback(e);
        }
        failAfterMs -= timeBetweenRetries;
        successCallback(fetchGateway(contextPath, method, body, timeBetweenRetries, failAfterMs));
      }, timeBetweenRetries);
    });
  }
}
