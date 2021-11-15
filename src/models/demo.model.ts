import {Entity, model, property} from '@loopback/repository';

@model()
export class Demo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  masterRegistryUri: string;

  @property({
    type: 'string',
    required: true,
  })
  publisherPrivKey: string;

  @property({
    type: 'string',
    required: true,
  })
  attestorPrivKey: string;

  @property({
    type: 'string',
    required: true,
  })
  alicePrivKey: string;

  @property({
    type: 'string',
    required: true,
  })
  bobPrivKey: string;


  constructor(data?: Partial<Demo>) {
    super(data);
  }
}

export interface DemoRelations {
  // describe navigational properties here
}

export type DemoWithRelations = Demo & DemoRelations;
