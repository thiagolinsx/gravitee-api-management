import { Api, ApiDefinition } from '../model/apis';
import { Plan, PlanStatus, PlanValidation } from '../model/plan';

import { PlanSecurityType } from '../model/plan';
import {faker} from '@faker-js/faker';

export class ApiFakers {
  static version() {
    const major = faker.datatype.number({ min: 1, max: 5 });
    const minor = faker.datatype.number({ min: 1, max: 10 });
    const patch = faker.datatype.number({ min: 1, max: 30 });
    return `${major}.${minor}.${patch}`;
  }

  static apiRating(): number {
    return faker.datatype.number({ min: 1, max: 5 });
  }

  static api(attributes?: Partial<Api>): Api {
    const name = faker.commerce.productName();
    return <Api>{
      ...attributes,
      contextPath: `/${faker.random.word()}-${faker.datatype.uuid()}-${Math.floor(Date.now() / 1000)}`,
      name,
      description: faker.commerce.productDescription(),
      version: ApiFakers.version(),
      endpoint: 'https://api.gravitee.io/echo',
    };
  }

  static apiDefinition(attributes?: Partial<ApiDefinition>): ApiDefinition {
    const name = faker.commerce.productName();
    return <ApiDefinition>{
      ...attributes,
      proxy: {
        context_path: `/${faker.random.word()}-${faker.datatype.uuid()}-${Math.floor(Date.now() / 1000)}`,
        endpoints: [
          {
            name: 'default',
            target: 'http://api.gravitee.io/echo',
            inherit: true,
          },
        ],
      },
      name,
      description: faker.commerce.productDescription(),
      version: ApiFakers.version(),
    };
  }

  static plan(attributes?: Partial<Plan>): Plan {
    return <Plan>{
      validation: PlanValidation.AUTO,
      securityDefinition: PlanSecurityType.API_KEY,
      status: PlanStatus.PUBLISHED,
      ...attributes,
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
    };
  }
}
