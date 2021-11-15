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

export class DemoController {
  constructor(
    @inject(RChain.RPUBLISHING)
    private demoData: Demo,
    @repository(DemoRepository)
    public demoRepository : DemoRepository,
    @inject(RestBindings.Http.RESPONSE)
    private response: Response
  ) {
    (this.response as any).setTimeout(99999);
  }

  @post('/demo')
  @response(200, {
    description: 'Demo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Demo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Demo, {
            title: 'NewDemo',
            
          }),
        },
      },
    })
    demo: Demo,
  ): Promise<Demo> {
    const count = await this.demoRepository.count();
    const demo2 = {
      id: count.count.toString(),
      ...this?.demoData,
    } as Demo

    return this.demoRepository.create(demo2);
  }
}
