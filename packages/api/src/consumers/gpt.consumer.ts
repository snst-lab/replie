import { GptService } from '@/services';
import { Controller, Injectable } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
@Controller()
export class GptConsumer {
  constructor(private readonly gptService: GptService) {}

  @MessagePattern('usePrompt')
  async usePrompt(@Payload() message) {
    const response = await this.gptService.usePrompt(message);
    return response;
  }
}
