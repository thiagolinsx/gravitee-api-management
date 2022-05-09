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
import { User } from "../entities/user/user";

declare let pendo: any;

class PendoService {
  private readonly env: string;

  constructor(private Constants) {
    'ngInject';
    this.env = this.Constants.org.settings.environment;
  }

  initialize(user: User) {
    // const env = this.configurationService.get('environment')?.toString();
    const env = "local-dev";
    pendo.initialize({
      visitor: {
        id: `${user.id}-${env}`,
      },
      account: {
        id: `${user.sourceId}-${env}`,
        userSource: user.source,
      },
    });
  }
}

export default PendoService;
