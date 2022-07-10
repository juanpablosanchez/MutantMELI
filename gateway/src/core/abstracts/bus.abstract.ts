import { ClientProxy } from '@nestjs/microservices';

export abstract class IBusService {
  abstract client: ClientProxy;
}
