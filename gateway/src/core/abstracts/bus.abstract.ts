import { ClientProxy } from '@nestjs/microservices';

export abstract class IBusServices {
  abstract client: ClientProxy;
}
