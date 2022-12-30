import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
  getHello(): string {
    return 'Hello World!!!';
  }
  fetch(id): string {
    return `Hello Word ${id}`;
  }
  save(message): string {
    return `save the ${message}`;
  }
  update(id: string, message: string): string {
    return `${id} remove ${message}`;
  }
  remove(id: number): string {
    return `${id} removed`;
  }
}
