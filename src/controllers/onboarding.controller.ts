import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  RestBindings,
  Response
} from '@loopback/rest';
import {Demo} from '../models';
import {DemoRepository} from '../repositories';
import {inject} from "@loopback/core";
import {RChain} from "loopback4-rpublishing";

export class OnboardingController {
  constructor(
    @repository(DemoRepository)
    public demoRepository : DemoRepository
  ) {}

  @get('/pop')
  @response(200, {
    description: 'Get one demo account',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Demo, {includeRelations: true}),
        },
      },
    },
  })
  async pop(
    @param.filter(Demo) filter?: Filter<Demo>,
  ): Promise<Demo> {
    const count = await this.demoRepository.count();
    if (count.count >= 1) {
      const accId = (count.count - 1);
      const found = await this.demoRepository.findById(accId.toString());
      await this.demoRepository.deleteById(accId.toString());
      return found;
      //return demo2;
    }
    return {} as Demo;
  }
  
  @get('/pop/count')
  @response(200, {
    description: 'Amount of accounts remaining',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Demo) where?: Where<Demo>,
  ): Promise<Count> {
    return this.demoRepository.count(where);
  }
}
